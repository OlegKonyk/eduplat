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

  function signupCtrl(edAuthService, $auth, edToasterService) {
    "ngInject";

    var ctrl = this;
    console.log(ctrl.ngModel);
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

(function() {
  'use strict';
  angular.module('app')
  .directive('validateEquals', function() {
    return {
      require: 'ngModel',
      /*scope: {
        otherModelValue: "=compareTo"
      },*/
      link: function(scope, element, attrs, ngModelCtrl) {
        function validateEqual(value) {
          var valid = (value === scope.$eval(attrs.validateEquals));
          console.log('valid: ' + valid);
          ngModelCtrl.$setValidity('confirmPassword', valid);
          return valid ? value : undefined;
        }

        ngModelCtrl.$parsers.push(validateEqual);
        ngModelCtrl.$formatters.push(validateEqual);

        /* scope.$watch("$ctrl.user.password", function() {
          console.log('Password is changing: ' + attrs.validateEquals);
          console.log(scope.register);
          validateEqual();
          ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
        });*/
      }
    };
  });
})();

