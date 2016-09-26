 angular
  .module('app', ['ngRoute', 'ngMaterial'])
  .config(config)
  .component('sepAbout', {
    template: '<h1>ABOUT</h1>'
  })
  .component('sepHome', {
    template: '<h1>HOME</h1>'
  });

 function config($mdThemingProvider, $mdIconProvider,
                 $routeProvider, $locationProvider) {
   $locationProvider.html5Mode(true);

   $routeProvider
      .when('/', {
        template: '<sep-home></sep-home>'
      })
      .when('/about', {
        template: '<sep-about></sep-about>'
      })
      .otherwise({
        redirectTo: '/'
      });

    /* $mdIconProvider
        .defaultIconSet("./assets/svg/avatars.svg", 128)
        .icon("menu", "./assets/svg/menu.svg", 24) */

   $mdThemingProvider.theme('default')
            .primaryPalette('brown')
            .accentPalette('red');
 }

