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

    edCategoriesManagementService.allCategoriesResource.get({mode: 'unwind'}).$promise
      .then(function(categories) {
        ctrl.categories_ = categories;
      }, function(err) {
        console.log(err);
      });


    ctrl.selectedVegetables = [];
    ctrl.categories = loadVegetables();

    ctrl.transformChip = function(chip) {
      // If it is an object, it's already a known chip
      if (angular.isObject(chip)) {
        return chip;
      }
      // Otherwise, create a new one
      return {name: chip, type: 'new'};
    };

    ctrl.querySearch = function(query) {
      var results = query ? ctrl.categories.filter(createFilterFor(query)) : [];
      console.log(results)
      return results;
    };

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(vegetable) {
        return (vegetable._lowername.indexOf(lowercaseQuery) === 0) ||
            (vegetable._lowertype.indexOf(lowercaseQuery) === 0);
      };
    }

    function loadVegetables() {
      var veggies = [
        {
          'name': 'Broccoli',
          'type': 'Brassica'
        },
        {
          'name': 'Cabbage',
          'type': 'Brassica'
        },
        {
          'name': 'Carrot',
          'type': 'Umbelliferous'
        },
        {
          'name': 'Lettuce',
          'type': 'Composite'
        },
        {
          'name': 'Spinach',
          'type': 'Goosefoot'
        }
      ];

      return veggies.map(function(veg) {
        veg._lowername = veg.name.toLowerCase();
        veg._lowertype = veg.type.toLowerCase();
        return veg;
      });
    }
  }
})();

