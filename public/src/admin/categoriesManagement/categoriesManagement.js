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

  function categoriesManagementCtrl($resource, edAuthService) {
    "ngInject";

    var ctrl = this;

    ctrl.isAddingMode = false;

    ctrl.$onInit = function() {
      getAllCategories();
    };

    var allCategoriesResource = $resource('/api/categories/all', {}, {
      get: {method: 'GET', isArray: true}
    });

    var categoriesResource = $resource('/api/categories');

    function getAllCategories() {
      return allCategoriesResource.get().$promise
        .then(function(categories) {
          console.log(categories);
          ctrl.categories = categories;
        }, function(err) {
          console.log(err);
        });
    }

    ctrl.addCategory = function() {
      //console.log(edAuthService.user);
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

    ctrl.confirmCreatingCategory = function(newCategory) {
      categoriesResource.save(newCategory).$promise
        .then(getAllCategories)
        .then(function(res) {
          console.log("rererere");
          ctrl.isAddingMode = false;
        }, function(err) {
          console.log(err);
        })
        
    };
  }
})();

