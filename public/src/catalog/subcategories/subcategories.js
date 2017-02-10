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

    var category = $stateParams.category;
    var sub = $stateParams.sub;
    console.log(category)

    ctrl.$onInit = function() {
      getCategoryData()
        //.then(getPlaylistsForCategory)
        .then(null, function(err) {
          console.log(err);
        });
    };

    // ctrl.goToCategory = function(id) {
    //   console.log(id)
    //   $state.go('subcategories', {category: id});
    // };

    function getCategoryData() {
      //console.log('####', {category: category})
      return edCategoriesManagementService.singleCategoryResource
        .get({category: category}).$promise
        .then(function(category) {
          ctrl.category = category[0];
          // ctrl.allSubcategoryNames = ctrl.category.subCategories.map(function(subCtegory) {
          //   return subCtegory.name;
          // });
          return ctrl.category;
        });
    }

    // function getPlaylistsForCategory(category) {
    //   return edPlaylistsService.playlistsByCategoryResource.get({categoryName: category.name}).$promise
    //     .then(function(playlists) {
    //       ctrl.playlists = playlists;
    //     });
    // }

    /*function getPlaylistsForSubCategory(subCategory) {
      return edPlaylistsService.playlistsByCategoryResource
        .get({categoryName: ctrl.category.name, subCategoryName: subCategory}).$promise
        .then(function(playlists) {
          ctrl.playlists = playlists;
        });
    }*/

    /*ctrl.loadDataForSubCategory = function(subCategory) {
      getPlaylistsForSubCategory(subCategory);
    };*/

    ctrl.goToSubCategory = function(subCategory) {
      console.log('^^^^^^', {category: category, sub: subCategory._id});
      $state.go('subcategories.selected', {category: category, subCategory: subCategory._id});
    };

    // ctrl.goToPlaylist = function(id) {
    //   $state.go('player', {video: id});
    // };
  }
})();

