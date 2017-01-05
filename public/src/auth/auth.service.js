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

    var googleSystemUserResource = $resource(
      '/api/auth/googleSystemUser',
      {code: '@code'},
      {post: {method: 'POST'}}
    );

    function authenticateYoutubeSysUser() {
      var options = `width=500,height=600,left=${($window.outerWidth - 500) / 2},top=${($window.outerHeight - 500) / 2.5}`;
      var popup = $window.open('', '', options);
      googleSystemUserResource.post().$promise
        .then(function(res) {
          var url = res.url;
          popup.location = url;
        })
        .then(asyncPopupMsgHandler)
        .then(getJWT)
        .then(function(jwt) {
          popup.close();
        },
        function(err) {
          console.log(err);
        });
    }

    function asyncPopupMsgHandler() {
      return new Promise(function(resolve, reject) {
        $window.addEventListener('message', function(event) {
          if (event.origin === $window.location.origin) {
            var code = event.data;
            resolve(code);
          } else {
            reject('Not able to retrive the code');
          }
        });
      });
    }

    function getJWT(code) {
      return googleSystemUserResource.get({
        code: code
      }).$promise;
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
