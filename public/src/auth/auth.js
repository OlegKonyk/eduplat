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

  function edAuthCtrl($auth, edAuthService) {
    "ngInject";

    var ctrl = this;

    ctrl.isAuthenticated = $auth.isAuthenticated;

    ctrl.logout = edAuthService.logout;
  }
})();
