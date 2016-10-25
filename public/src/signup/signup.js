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

  function signupCtrl(edAuthService, $auth, edToasterService) {
    "ngInject";

    var ctrl = this;
    ctrl.signup = function() {
      $auth.signup({
        email: ctrl.user.email,
        password: ctrl.user.password
      }).then(function(res) {
        edToasterService.showCustomToast({
          type: 'success',
          message: 'Welcome, ' + res.data.user.email + '! Please email activate your account in the next several days.'
        });
      }).catch(function(err) {
        console.log(err);
        let message = err.data ? err.data.message : err.statusText;
        edToasterService.showCustomToast({
          type: 'warning',
          message: 'Unable to create account : ' + message
        });
      });
    };
  }
})();
