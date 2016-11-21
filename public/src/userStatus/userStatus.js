(function() {
  'use strict';
  angular.module('app')
    .component('edUserStatus',
    {
      bindings: {},
      template: function($templateCache) {
        "ngInject";
        return $templateCache.get('public/src/userStatus/userStatus.html');
      },
      controller: userStatusCtrl
    }
  );

  function userStatusCtrl($auth, edAuthService, $mdDialog) {
    "ngInject";

    var ctrl = this;
    ctrl.isAuthenticated = $auth.isAuthenticated;

    ctrl.getUser = function() {
      edAuthService.getUser()
        .then(function(user) {
          ctrl.user = user;
        }, function(err) {
          console.log(err);
        });
    };

    ctrl.$onInit = function() {
      ctrl.getUser();
    };

    ctrl.logout = edAuthService.logout;

    ctrl.openMenu = function($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
    };
  }
})();

