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

  function catalogCtrl(edCategoriesManagementService, $state) {
    "ngInject";

    var ctrl = this;

    ctrl.$onInit = function() {
      getAllCategories();
    };

    ctrl.goToCategory = function(id) {
      console.log(id)
      $state.go('subcategories', {category: id});
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

