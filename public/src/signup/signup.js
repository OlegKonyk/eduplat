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

  function signupCtrl(edAuthService, $auth) {
    "ngInject";

    var ctrl = this;
    ctrl.signup = function() {
      var newUserData = ctrl.user;
      console.log(newUserData);
      /* mvAuth.createUser(newUserData).then(function() {
        mvNotifier.notify('User account created!');
        $location.path('/');
      }, function(reason) {
        mvNotifier.error(reason);
      });*/
      $auth.signup({user: {
        email: ctrl.user.email,
        password: ctrl.user.password
      }}).then(function(res) {
        console.log('SUCSESS');
        // alert('success', 'Account Created!', 'Welcome, ' + res.data.user.email + '! Please email activate your account in the next several days.');
      }).catch(function(err) {
        console.log(err);
				// alert('warning', 'Unable to create account :(', err.message);
      });
    };
  }
})();
