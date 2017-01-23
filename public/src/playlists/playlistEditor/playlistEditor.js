(function() {
  'use strict';
  angular.module('app.playlists')
  .component('edPlaylistEditor', {
    bindings: {},
    template: function($templateCache) {
      "ngInject";
      return $templateCache.get('public/src/playlists/playlistEditor/playlistEditor.html');
    },
    controller: playlistEditorCtrl
  })
  .filter('byteSizeConvertor', function() {
    return function(bytes, precision) {
      if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
      if (typeof precision === 'undefined') precision = 1;
      var units = ['bytes', 'kB', 'MB'];
      var number = Math.floor(Math.log(bytes) / Math.log(1024));
      return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) + ' ' + units[number];
    };
  });

  function playlistEditorCtrl($scope, Upload, $timeout, edPlaylistsService, edAuthService, edCategoriesManagementService) {
    "ngInject";

    var ctrl = this;

    ctrl.user = edAuthService.user;

    ctrl.groups = edAuthService.user.owner
      .map(group => {
        return {name: group};
      });

    ctrl.newPlaylist = {
      isPlaylist: true,
      groups: [ctrl.groups[0].name]
    };

    $scope.$watch('$ctrl.file', function() {
      if (ctrl.file && !ctrl.file.$error) {
        Upload.imageDimensions(ctrl.file)
          .then(function(dimensions) {
            ctrl.dimentions = dimensions;
          });
      }
    });

    ctrl.addPlaylist = function(file, newPlaylist) {
      ctrl.dimentions = {};
      if (file) {
        if (!file.$error) {
          // Upload.imageDimensions(file)
          // .then(function(dimensions) {
          //   ctrl.dimentions = dimensions;
          //   console.log(ctrl.dimentions);
          //   return file;
          // })
          // .then(Upload.base64DataUrl(file))
          Upload.base64DataUrl(file)
          .then(function(thumbnail) {
            newPlaylist.thumbnail = thumbnail;
            return edPlaylistsService.personalResource
              .save(newPlaylist)
              .$promise;
          })
          .then(function(res) {
            console.log(res);
          });
        }
      }
    };

    ctrl.fetchYoutubeData = function(newPlaylist) {
      console.log(newPlaylist);
      ctrl.fetchingYoutubeData = true;

      edPlaylistsService.fetchYoutubeResource.save(newPlaylist).$promise
        .then(function(youtubeData) {
          ctrl.youtubeData = youtubeData;
          ctrl.fetchingYoutubeData = false;
        }, function(err) {
          console.log(err);
        });
    };

    edCategoriesManagementService.allCategoriesResource.get({mode: 'unwind'}).$promise
      .then(function(categories) {
        ctrl.categories = categories.map(function(category) {
          category._masterName = category.masterName.toLowerCase();
          category._category = category.category.toLowerCase();
          category._subCategory = category.subCategory.toLowerCase();
          return category;
        });
      }, function(err) {
        console.log(err);
      });


    ctrl.selectedCategories = [];
    //ctrl.categories = loadVegetables();

    ctrl.transformChip = function(chip) {
      // If it is an object, it's already a known chip
      if (angular.isObject(chip)) {
        return chip;
      }
      // Otherwise, create a new one
      return {masterName: "New", category: "New", subCategory: chip};
    };

    ctrl.querySearch = function(query) {
      var results = query ? ctrl.categories.filter(createFilterFor(query)) : [];
      return results;
    };

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(category) {
        return (category._masterName.indexOf(lowercaseQuery) === 0) ||
            (category._category.indexOf(lowercaseQuery) === 0) ||
            (category._subCategory.indexOf(lowercaseQuery) === 0);
      };
    }
  }
})();

