(function() {
  'use strict';

  angular.module('app')
		.service('edAuthService', edAuthService);

  function edAuthService($resource, $auth, edToasterService, $location) {
    "ngInject";
    var service = {
      getUser, logout
    };

    var userResource = $resource(
      '/api/user/',
      {_id: '@_id'}
    );

    let cacheUser;

    function getUser() {
      let payload = $auth.getPayload();
      let expired = payload.exp - Date.now() <= 0;
      if (expired) {
        logout();
      } else {
        if (cacheUser) {
          return Promise.resolve(cacheUser);
        } else {
          return userResource.get({_id: payload.sub})
            .$promise
            .then(function(user) {
              cacheUser = user;
              return cacheUser;
            }, handleError);
        }
      }
    }

    function logout() {
      $auth.logout();
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
