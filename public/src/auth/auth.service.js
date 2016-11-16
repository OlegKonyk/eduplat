(function() {
  'use strict';

  angular.module('app')
		.service('edAuthService', edAuthService);

  function edAuthService($resource, $auth, edToasterService, $location) {
    "ngInject";
    var service = {
      getUser, logout, user: undefined
    };

    var userResource = $resource(
      '/api/user/',
      {_id: '@_id'}
    );

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
            return userResource.get({_id: payload.sub})
              .$promise
              .then(function(_user) {
                service.user = _user;
                return service.user;
              }, handleError);
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

    function handleError(err) {
      let message = err.data ? err.data : err.statusText;
      edToasterService.showCustomToast({
        type: 'warning',
        message: 'Something went wrong: ' + message
      });
      logout();
    }

    return service;
  }
})();
