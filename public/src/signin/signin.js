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

  function signinCtrl($auth, $location, edToasterService) {
    "ngInject";

    var ctrl = this;

    ctrl.signin = function() {
      $auth.login(ctrl.user)
        .then(function(res) {
          var message = 'Thanks for comming back ' + res.data.user.email + '!';
          if (!res.data.user.active) {
            message = 'Please activate your account soon!';
          }
          $location.path('/');
          edToasterService.showCustomToast({
            type: 'success',
            message: message
          });
        })
        .catch(function(err) {
          console.log(err);
          let message = err.data ? err.data.message : err.statusText;
          edToasterService.showCustomToast({
            type: 'warning',
            message: 'Something went wrong: ' + message
          });
        });
    };
  }
})();
