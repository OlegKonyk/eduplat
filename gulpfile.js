const gulp = require('gulp');
const eslint = require('gulp-eslint');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const ngAnnotate = require('gulp-ng-annotate');
const livereload = require('gulp-livereload');
const babel = require('gulp-babel');
// const clean = require('gulp-clean');
const mainBowerFiles = require('main-bower-files');
const exists = require('path-exists').sync;

gulp.task('lint', () => {
  return gulp.src(['!public/build/**',
                   '!node_modules/**',
                   '!bower_components/**',
                   '**/*.js'
                   ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

/* gulp.task('clean', function() {
  return gulp.src(['public/dist', 'public/vendor', 'public/testReports'], {read: false})
		.pipe(clean());
}); */

gulp.task('concat-app-js', () => {
  return gulp.src(['public/src/*.js'
                   // 'public/**/*module.js'
                   ])
    .pipe(ngAnnotate())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public/build/'));
});

gulp.task('minify-app-js', ['concat-app-js'], () => {
  return gulp.src('public/build/app.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/build/'));
});

gulp.task('concat-app-css', () => {
  return gulp.src('public/assets/css/*.css')
    .pipe(concat('app.css'))
    .pipe(gulp.dest('public/build/'));
});

gulp.task('minify-app-css', ['concat-app-css'], () => {
  return gulp.src('public/build/app.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('public/build/'));
});

gulp.task('concat-vendor-js', function() {
  return gulp.src(getMainBowerFiles('js', true), {base: './bower_components'})
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('public/build/'));
});

gulp.task('concat-vendor-css', function() {
  return gulp.src(getMainBowerFiles('css', true), {base: 'bower_components'})
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('public/build/'));
});

gulp.task('reload', ['develop'], () => {
  livereload.listen({quiet: true});
  gulp.src(['public/**',
            '!public/build/**'])
        .pipe(livereload());
});

gulp.task('watch', () => {
  gulp.watch(['public/**',
              '!public/build/**'], ['reload']);
});

gulp.task('default', ['build']);

gulp.task('develop', ['concat-vendor-css',
                      'concat-app-css',
                      'concat-vendor-js',
                      'concat-app-js',
                      'watch']);

gulp.task('build', ['lint',
                    'concat-vendor-css',
                    'minify-app-css',
                    'concat-vendor-js',
                    'minify-app-js']);

function getMainBowerFiles(extention, minified) {
  return mainBowerFiles()
    .filter(function(path, index, arr) {
      return path.indexOf(`.${extention}`) > 0;
    })
    .map(function(path, index, arr) {
      var replaceStr = minified ? `.min.${extention}` : `.${extention}`;
      var newPath = path.replace(/.([^.]+)$/g, replaceStr);
      return exists(newPath) ? newPath : path;
    });
}
