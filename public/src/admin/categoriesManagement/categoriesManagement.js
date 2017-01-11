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

  function categoriesManagementCtrl($resource) {
    "ngInject";

    var ctrl = this;

    ctrl.isAddingMode = false;

    var categoriesResource = $resource('/api/categories/all', {}, {
      get: {method: 'GET', isArray: true}
    });

    categoriesResource.get().$promise
      .then(function(categories) {
        console.log("categories");
        ctrl.categories = categories;
      }, function(err) {
        console.log(err);
      });

    ctrl.addCategory = function() {
      console.log("adding category");
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

    ctrl.appendNextCategory = function(newCategory) {
      console.log("appendNextCategory");
      newCategory.categories.push({
        name: undefined,
        subCategories: [{
          name: undefined
        }]
      });
    };

    ctrl.appendNextSubCategory = function(category) {
      console.log("appendNextSubCategory");
      category.subCategories.push({
        name: undefined
      });
    };

    ctrl.confirmCreatingCategory = function() {
      console.log("confirm creating category");
      ctrl.isAddingMode = false;
    };
  }
})();

