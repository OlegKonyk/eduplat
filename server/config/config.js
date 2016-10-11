var path = require('path');
var rootPath = path.resolve(__dirname, '../../');
console.log(rootPath);

module.exports = {
  development: {
    db: 'mongodb://localhost/eduplat',
    rootPath: rootPath,
    port: process.env.PORT || 3030
  },
  production: {
    db: 'mongodb://localhost/eduplat',
    rootPath: rootPath,
    port: process.env.PORT || 80
  }
};
