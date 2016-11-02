
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
