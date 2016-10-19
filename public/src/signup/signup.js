(function() {
  'use strict';
  angular.module('app')
    .component('edSignup',
    {
      bindings: {},
      template: function($templateCache) {
        "ngInject";
        return $templateCache.get('public/src/signup/signup.html');
      },
      controller: signupCtrl
    }
  );

  function signupCtrl() {
    "ngInject";

    var ctrl = this;
  }
})();
