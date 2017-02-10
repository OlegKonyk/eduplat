(function() {
  'use strict';
  angular.module('app')
    .component('edCategoryList',
    {
      bindings: {},
      template: function($templateCache) {
        "ngInject";
        return $templateCache.get('public/src/catalog/categoryList/categoryList.html');
      },
      controller: categoryListCtrl
    }
  );

  function categoryListCtrl(edCategoriesManagementService, edPlaylistsService, $stateParams, $state) {
    "ngInject";

    var ctrl = this;

    var category = $stateParams.category;
    var subCategory = $stateParams.subCategory;
    console.log(category, subCategory)

    ctrl.$onInit = function() {
      getCategoryData()
        .then(getPlaylistsForCategory)
        .then(null, function(err) {
          console.log(err);
        });
    };

    function getCategoryData() {
      
      var query = subCategory ? {category: category, subCategory: subCategory} :
                        {category: category};
      console.log('####', query)
      return edCategoriesManagementService.singleCategoryResource
        .get(query).$promise
        .then(function(category) {
          ctrl.category = category[0];
          // ctrl.allSubcategoryNames = ctrl.category.subCategories.map(function(subCtegory) {
          //   return subCtegory.name;
          // });
          return ctrl.category;
        });
    }

    function getPlaylistsForCategory(category) {
      var query = subCategory ? {categoryName: category.name, subCategory: category.subCategories.name} :
                        {categoryName: category.name};

      console.log('!!!!', query)
      return edPlaylistsService.playlistsByCategoryResource
        .get(query).$promise
        .then(function(playlists) {
          ctrl.playlists = playlists;
        });
    }

    // ctrl.goToSubCategory = function(subCategory) {
    //   console.log('^^^^^^', {category: category, sub: subCategory._id});
    //   $state.go('subcategories', {category: category, sub: subCategory._id});
    // };

    ctrl.goToPlaylist = function(id) {
      $state.go('player', {video: id});
    };
  }
})();

