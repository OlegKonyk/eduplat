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

  function subcategoriesCtrl(edCategoriesManagementService, edPlaylistsService, $stateParams, $state) {
    "ngInject";

    var ctrl = this;

    ctrl.$onInit = function() {
      getCategoryData()
        .then(getPlaylistsForCategory)
        .then(null, function(err) {
          console.log(err);
        });
    };

    // ctrl.goToCategory = function(id) {
    //   console.log(id)
    //   $state.go('subcategories', {category: id});
    // };

    function getCategoryData() {
      return edCategoriesManagementService.singleCategoryResource.get({category: $stateParams.category}).$promise
        .then(function(category) {
          ctrl.category = category;
          // ctrl.allSubcategoryNames = ctrl.category.subCategories.map(function(subCtegory) {
          //   return subCtegory.name;
          // });
          return ctrl.category;
        });
    }

    function getPlaylistsForCategory(category) {
      return edPlaylistsService.playlistsByCategoryResource.get({categoryName: category.name}).$promise
        .then(function(playlists) {
          ctrl.playlists = playlists;
        });
    }

    ctrl.goToPlaylist = function(id) {
      $state.go('player', {video: id});
    };
  }
})();

