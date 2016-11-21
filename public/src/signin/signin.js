(function() {
  'use strict';
  angular.module('app')
    .component('edSignin',
    {
      bindings: {},
      template: function($templateCache) {
        "ngInject";
        return $templateCache.get('public/src/signin/signin.html');
      },
      controller: signinCtrl
    }
  );

  function signinCtrl(edAuthService) {
    "ngInject";

    var ctrl = this;

    ctrl.signin = function() {
      edAuthService.login(ctrl.user);
    };

    ctrl.authenticate = function(privider) {
      edAuthService.authenticate(privider);
    };
  }
})();
