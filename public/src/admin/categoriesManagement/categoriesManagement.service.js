(function() {
  'use strict';

  angular.module('app.admin')
		.service('edCategoriesManagementService', categoriesManagementService);

  function categoriesManagementService($resource) {
    "ngInject";

    var allCategoriesResource = $resource('/api/categories/all', {mode: '@mode'}, {
      get: {method: 'GET', isArray: true}
    });

    var subcategoriesResource = $resource('/api/categories/subcategories', {category: '@category'});

    var categoriesResource = $resource('/api/categories');

    return {categoriesResource, allCategoriesResource, subcategoriesResource};
  }
})();
