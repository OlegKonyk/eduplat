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

  function signinCtrl($auth, edToasterService) {
    "ngInject";

    var ctrl = this;

    ctrl.signin = function() {
      $auth.login({email: ctrl.user.email, password: ctrl.user.password})
        .then(function(res) {
          var message = 'Thanks for comming back ' + res.data.user.email + '!';
          if (!res.data.user.active) {
            message = 'Please activate your account soon!';
          }
          // $state.go('main');
          edToasterService.showCustomToast({
            type: 'success',
            message: message
          });
        })
        .catch(function(err) {
          edToasterService.showCustomToast({
            type: 'warning',
            message: 'Something went wrong: ' + err.data.message
          });
        });
    };
  }
})();
