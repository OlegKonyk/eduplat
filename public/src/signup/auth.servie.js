(function() {
  'use strict';
  angular.module('app')
  .service('edAuthService', function auth($http, API_URL, edAuthTokenService, $window, $q) {
    "ngInject";
    function authSuccessful(res) {
      edAuthTokenService.setToken(res.token);
      // $state.go('main');
      console.log("LOGGED IN!!!");
    }

    this.login = function(email, password) {
      return $http.post(API_URL + 'login', {
        email: email,
        password: password
      }).success(authSuccessful);
    };

    this.register = function(email, password) {
      return $http.post(API_URL + 'api/register', {
        email: email,
        password: password
      }).success(authSuccessful);
    };

    var urlBuilder = [];
    var clientId = '755194447289-i6qu5n18jnh4lhph17j19cq08i0fq6f4.apps.googleusercontent.com';

    urlBuilder.push('response_type=code',
                    'client_id=' + clientId,
                    'redirect_uri=' + $window.location.origin,
                    'scope=profile email');

    this.googleAuth = function() {
      var url = "https://accounts.google.com/o/oauth2/auth?" + urlBuilder.join('&');
      var options = 'width=500,height=500,left=' + ($window.outerWidth - 500) / 2 + ',top=' + ($window.outerHeight - 500) / 2.5;

      var deferred = $q.defer();

      var popup = $window.open(url, '', options);
      $window.focus();

      $window.addEventListener('message', function(event) {
        if (event.origin === $window.location.origin) {
          var code = event.data;
          popup.close();

          $http.post(API_URL + 'auth/google', {
            code: code,
            clientId: clientId,
            redirectUri: $window.location.origin
          }).success(function(jwt) {
            authSuccessful(jwt);
            deferred.resolve(jwt);
          });
        }
      });

      return deferred.promise;
    };
  });
})();
