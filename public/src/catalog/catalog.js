(function() {
  'use strict';
  angular.module('app')
    .component('edCatalog',
    {
      bindings: {},
      template: function($templateCache) {
        "ngInject";
        return $templateCache.get('public/src/catalog/catalog.html');
      },
      controller: catalogCtrl
    }
  );

  function catalogCtrl(edCategoriesManagementService) {
    "ngInject";

    var ctrl = this;

    ctrl.$onInit = function() {
      getAllCategories();
    };

    function getAllCategories() {
      return edCategoriesManagementService.allCategoriesResource.get().$promise
        .then(function(categories) {
          ctrl.categories = categories;
        }, function(err) {
          console.log(err);
        });
    }
  }
})();

