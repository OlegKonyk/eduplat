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
    edAuthService.getUser()
     .then(function(user) {
       ctrl.user = user;
       console.log(ctrl.user);
     });

    ctrl.logout = edAuthService.logout;

    ctrl.openMenu = function($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
    };
  }
})();

