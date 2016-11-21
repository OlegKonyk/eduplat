(function() {
  'use strict';

  angular.module('app')
		.service('edAuthService', edAuthService);

  function edAuthService($rootScope, $resource, $auth, edToasterService, $location, edErrorsService) {
    "ngInject";
    var service = {
      getUser, logout, user: undefined
    };

    var userResource = $resource(
      '/api/user/',
      {_id: '@_id'}
    );

    userResource.prototype.isAdmin = function() {
      return this.roles && this.roles.indexOf('admin') > -1;
    };

    let getUserPromise;

    function getUser() {
      if($auth.isAuthenticated()){
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

    function logout() {
      $auth.logout();
      service.user = undefined;
      $location.path('/');
    }

    return service;
  }
})();
