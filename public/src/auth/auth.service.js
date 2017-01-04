(function() {
  'use strict';

  angular.module('app')
		.service('edAuthService', edAuthService);

  function edAuthService($rootScope, $resource, $auth,
                         edToasterService, $location,
                         edErrorsService, $window, $http, $q) {
    "ngInject";
    var service = {
      authenticate,
      authenticateYoutubeSysUser,
      signup,
      login,
      logout,
      getUser,
      user: undefined
    };

    var userResource = $resource(
      '/api/user/',
      {_id: '@_id'}
    );

    userResource.prototype.isAdmin = function() {
      return this.roles && this.roles.indexOf('admin') > -1;
    };

    function authenticate(privider) {
      $auth.authenticate(privider)
          .then(function(res) {
            edToasterService.showCustomToast({
              type: 'success',
              message: 'Thanks for comming ' + res.data.user.firstName + '!'
            });
            $location.path('/');
          }, edErrorsService.handleError);
    }

    var urlBuilder = [];
    var clientId = '180115616906-3dekl0d823bbm280f1hidk1kk41cd9fl.apps.googleusercontent.com';

    urlBuilder.push('response_type=code',
      'client_id=' + clientId,
      'redirect_uri=' + $window.location.origin,
      'access_type=offline',
      'scope=profile email https://gdata.youtube.com');

    function authenticateYoutubeSysUser() {
      /*var url = "https://accounts.google.com/o/oauth2/auth?" + urlBuilder.join('&');
      var options = 'width=500,height=500,left=' + ($window.outerWidth - 500) / 2 + ',top=' + ($window.outerHeight - 500) / 2.5;
      
      var deferred = $q.defer();

      var popup = $window.open(url, '', options);
      $window.focus();

      $window.addEventListener('message', function(event){
        if (event.origin === $window.location.origin) {
          var code = event.data;
          console.log(code);
          popup.close();

          $http.post('/api/auth/googleSystemUser', {
            code: code, 
            clientId: clientId,
            redirectUri: $window.location.origin
          }).then(function(jwt) {
            //authSuccessfull(jwt);
            console.log(jwt);
            deferred.resolve(jwt);
          });
        }
      });

      return deferred.promise;*/
      var options = 'width=500,height=500,left=' + ($window.outerWidth - 500) / 2 + ',top=' + ($window.outerHeight - 500) / 2.5;
      $http.post('/api/auth/googleSystemUser', {})
        .then(function(res) {
          //authSuccessfull(jwt);
          var url = res.data.url;
          console.log("////////");
          console.log(url);
          var popup = $window.open(url, '', options);
          $window.focus();
          console.log(popup);
        }, function(err) {
          //authSuccessfull(jwt);
          console.log("////////");
          console.log(err);
        });
    }

    function signup(user) {
      $auth.signup(user)
        .then(function(res) {
          $auth.login(user);
          return res;
        })
        .then(function(res) {
          $location.path('/');
          edToasterService.showCustomToast({
            type: 'success',
            message: 'Welcome, ' +
              res.data.user.email +
              '! Please email activate your account in the next several days.'
          });
        }, edErrorsService.handleError);
    }

    function login(user) {
      $auth.login(user)
        .then(function(res) {
          var message = 'Thanks for comming back ' + res.data.user.email + '!';
          if (!res.data.user.active) {
            message = 'Please activate your account soon!';
          }
          $location.path('/');
          edToasterService.showCustomToast({
            type: 'success',
            message: message
          });
        }, edErrorsService.handleError);
    }

    let getUserPromise;

    function getUser() {
      if ($auth.isAuthenticated()) {
        let payload = $auth.getPayload();
        let expired = payload.exp - Date.now() <= 0;
        if (expired) {
          logout();
          return Promise.reject('Authentication expired');
        } else {
          if (service.user) {
            return Promise.resolve(service.user);
          } else {
            if (getUserPromise) {
              return getUserPromise;
            } else {
              getUserPromise = userResource.get({_id: payload.sub})
                .$promise
                .then(function(_user) {
                  service.user = _user;
                  userChange(_user);
                  return service.user;
                }, function(err) {
                  logout();
                  edErrorsService.handleError(err);
                });
              return getUserPromise;
            }
          }
        }
      } else {
        return Promise.reject('User is not authenticated');
      }
    }

    function userChange(user) {
      $rootScope.$emit('edUserChange', user);
    }

    function logout() {
      $auth.logout();
      userChange();
      getUserPromise = undefined;
      service.user = undefined;
      $location.path('/');
    }

    return service;
  }
})();
