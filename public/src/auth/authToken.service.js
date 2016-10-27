(function() {
  'use strict';
  angular.module('app')
  .factory('edAuthTokenService', function($window) {
    "ngInject";
    var storage = $window.localStorage;
    var cachedToken;
    var userToken = 'userToken';
    var isAuthenticated = false;
    var authToken = {
      setToken: function(token) {
        cachedToken = token;
        storage.setItem(userToken, token);
        isAuthenticated = true;
      },
      getToken: function() {
        if (!cachedToken)
          cachedToken = storage.getItem(userToken);

        return cachedToken;
      },
      isAuthenticated: function() {
        return Boolean(authToken.getToken());
      },
      removeToken: function() {
        cachedToken = null;
        storage.removeItem(userToken);
        isAuthenticated = false;
      }
    };

    return authToken;
  })
  .factory('authInterceptor', function(edAuthTokenService) {
    return {
      request: function(config) {
        var token = edAuthTokenService.getToken();
        if (token) {
          config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
      },
      response: function(response) {
        return response;
      }
    };
  });
})();
