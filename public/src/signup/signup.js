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

    ctrl.signup = function() {
      $auth.signup({
        email: ctrl.user.email,
        password: ctrl.user.password
      }).then(function(res) {
        edToasterService.showCustomToast({
          type: 'success',
          message: 'Welcome, ' +
                   res.data.user.email +
                   '! Please email activate your account in the next several days.'
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
  .directive('edValidateEquals', function() {
    "ngInject";
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModelCtrl) {
        function validateEqual(value) {
          var valid = (value === scope.$eval(attrs.edValidateEquals));
          console.log(value, scope.$eval(attrs.edValidateEquals));
          console.log('valid: ' + valid);
          console.log(scope);
          ngModelCtrl.$setValidity('confirmPassword', valid);
          return value;
        }

        ngModelCtrl.$parsers.push(validateEqual);
        ngModelCtrl.$formatters.push(validateEqual);

        scope.$watch(attrs.edValidateEquals, function() {
          validateEqual(scope.$eval(attrs.ngModel));
          ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
        });
      }
    };
  });
})();

