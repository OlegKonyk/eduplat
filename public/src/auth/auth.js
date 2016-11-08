(function() {
  'use strict';
  angular.module('app')
    .component('edAuth',
    {
      bindings: {},
      template: function($templateCache) {
        "ngInject";
        return $templateCache.get('public/src/auth/auth.html');
      },
      controller: edAuthCtrl
    }
  );

  function edAuthCtrl($auth, $location, $resource) {
    "ngInject";

    var ctrl = this;

    ctrl.isAuthenticated = $auth.isAuthenticated;
    console.log($auth);
    ctrl.logout = function() {
      $auth.logout();
      $location.path('/');
    };

    var userResource = $resource(
      '/api/user/',
      {_id: '@_id'}
    );

    function validateToken() {
      let payload = $auth.getPayload();
      let expired = payload.exp - Date.now() <= 0;
      console.log(expired);
      if (!expired) {
        console.log('getting user data: ' + payload.sub);
        userResource.get({_id: payload.sub})
        .$promise
        .then(function(user) {
          console.log(">>>>>>>");
          console.log(user);
          ctrl.user = user;
        });
      }
    }

    if (ctrl.isAuthenticated()) validateToken();
  }
})();
