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

  function signinCtrl($auth) {
    "ngInject";

    var ctrl = this;

    ctrl.signin = function() {
      $auth.login({email: ctrl.user.email, password: ctrl.user.password})
        .then(function(res) {
          var message = 'Thanks for comming back' + res.data.user.email + '!';
          if (!res.data.user.active) {
            message = 'Just a reminder, please activate your account soon!';
          }
          // alert('success', 'Welcome! ', message);
          // $state.go('main');
          console.log('go now!!!', message);
        })
        .catch(handleError);
    };
  }

  function handleError(err) {
    console.log(err);
    // alert('warning', 'Something went wrong: ', err.message);
  }
})();
