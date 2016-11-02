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

  function signupCtrl($auth, $location, edToasterService) {
    "ngInject";
    var ctrl = this;

    ctrl.signup = function() {
      $auth.signup(ctrl.user)
      .then(function(res) {
        $auth.login(ctrl.user);
        return res;
      })
      .then(function(res) {
        $location.path('/');
        edToasterService.showCustomToast({
          type: 'success',
          message: 'Welcome, ' +
            res.data.user.email +
            '! Please email activate your account in the next several days.'
        });
      })
      .catch(function(err) {
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

