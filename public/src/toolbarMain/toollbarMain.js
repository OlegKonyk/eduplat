(function() {
  'use strict';
  angular.module('app')
    .component('edToolbarMain',
    {
      bindings: {},
      template: function($templateCache) {
        "ngInject";
        return $templateCache.get('public/src/toolbarMain/toollbarMain.html');
      },
      controller: toolbarMainCtrl
    }
  );

  function toolbarMainCtrl($auth, $location) {
    "ngInject";

    var ctrl = this;

    ctrl.isAuthenticated = $auth.isAuthenticated;
    ctrl.logout = function() {
      $auth.logout();
      $location.path('/');
    };
  }
})();
