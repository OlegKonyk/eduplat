(function() {
  'use strict';
  angular.module('app')
    .component('edSubcategories',
    {
      bindings: {},
      template: function($templateCache) {
        "ngInject";
        return $templateCache.get('public/src/catalog/subcategories/subcategories.html');
      },
      controller: subcategoriesCtrl
    }
  );

  function subcategoriesCtrl(edCategoriesManagementService, $stateParams) {
    "ngInject";

    var ctrl = this;

    ctrl.$onInit = function() {
      getSubcategories();
    };

    // ctrl.goToCategory = function(id) {
    //   console.log(id)
    //   $state.go('subcategories', {category: id});
    // };

    function getSubcategories() {
      return edCategoriesManagementService.subcategoriesResource.get({category: $stateParams.category}).$promise
        .then(function(subcategories) {
          ctrl.subcategories = subcategories;
        }, function(err) {
          console.log(err);
        });
    }
  }
})();

