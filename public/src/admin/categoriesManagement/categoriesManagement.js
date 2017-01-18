(function() {
  'use strict';
  angular.module('app.admin')
    .component('edCategoriesManagement',
    {
      bindings: {},
      template: function($templateCache) {
        "ngInject";
        return $templateCache.get('public/src/admin/categoriesManagement/categoriesManagement.html');
      },
      controller: categoriesManagementCtrl
    }
  );

  function categoriesManagementCtrl($resource, edAuthService, edCategoriesManagementService) {
    "ngInject";

    var ctrl = this;

    ctrl.isAddingMode = false;

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

    ctrl.addMasterCategory = function() {
      ctrl.isAddingMode = true;
      ctrl.newCategory = {
        masterName: undefined,
        categories: [{
          name: undefined,
          subCategories: [{
            name: undefined
          }]
        }]
      };
    };

    ctrl.appendNextCategory = function(category) {
      if (category.name) {
        ctrl.newCategory.categories.push({
          name: undefined,
          subCategories: [{
            name: undefined
          }]
        });
      }
    };

    ctrl.appendNextSubCategory = function(category, subCategory) {
      if (subCategory.name) {
        category.subCategories.push({
          name: undefined
        });
      }
    };

    ctrl.confirmCreatingCategory = function(newCategory) {
      edCategoriesManagementService.categoriesResource.save(newCategory).$promise
        .then(getAllCategories)
        .then(function(res) {
          ctrl.isAddingMode = false;
        }, function(err) {
          console.log(err);
        });
    };
  }
})();

