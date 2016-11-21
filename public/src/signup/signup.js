(function() {
  'use strict';
  angular.module('app')
    .component('edSignup',
    {
      bindings: {},
      require: 'ngModel',
      template: function($templateCache) {
        "ngInject";
        return $templateCache.get('public/src/signup/signup.html');
      },
      controller: signupCtrl
    }
  );

  function signupCtrl(edAuthService) {
    "ngInject";
    var ctrl = this;

    ctrl.signup = function() {
      edAuthService.signup(ctrl.user);
    };

    ctrl.authenticate = function(privider) {
      edAuthService.authenticate(privider);
    };
  }
})();

