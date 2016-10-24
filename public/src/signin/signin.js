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

  function signinCtrl() {
    "ngInject";

    var ctrl = this;

    ctrl.signup = function() {
      console.log('logging in');
    };
  }
})();
