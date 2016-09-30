var path = require('path');
var rootPath = path.resolve(__dirname, '../../');
console.log(rootPath);

module.exports = {
  development: {
    rootPath: rootPath,
    port: process.env.PORT || 3030
  },
  production: {
    rootPath: rootPath,
    port: process.env.PORT || 80
  }
};
