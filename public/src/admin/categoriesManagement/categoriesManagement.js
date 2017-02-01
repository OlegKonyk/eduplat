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

    ctrl.addNewCategory = function() {
      ctrl.isAddingMode = true;
      ctrl.newCategory = {
        name: undefined,
        subCategories: [{
          name: undefined
        }]
      };
    };

    ctrl.appendNextSubCategory = function(category, subCategory) {
      if (subCategory.name) {
        category.subCategories.push({
          name: undefined
        });
      }
    };

    ctrl.confirmCreatingCategory = function(newCategory) {
      /*newCategory.categories = newCategory.categories.map(category => {
        category.subCategories = category.subCategories.filter(subCategory => subCategory.name);
        return category;
      }).filter(category => category.name);*/

      newCategory.subCategories = newCategory.subCategories.filter(category => category.name);

      console.log(newCategory)
      
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

