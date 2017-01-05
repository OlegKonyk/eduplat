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
  });

  function playlistEditorCtrl($scope, Upload, $timeout, edPlaylistsService, edAuthService) {
    "ngInject";

    var ctrl = this;

    ctrl.user = edAuthService.user;

    ctrl.groups = edAuthService.user.owner
      .map(group => {
        return {name: group};
      });

    ctrl.addPlaylist = function(newPlaylist) {
      newPlaylist.links = newPlaylist.links.split(',');
      edPlaylistsService.personalResource
        .save(newPlaylist)
        .$promise
        .then(function(something) {
          console.log(something);
        }, function(err) {
          console.log(err);
        });
    };

    ctrl.newPlaylist = {
      groups: [ctrl.groups[0].name]
    };

    ctrl.upload = function(file, newPlaylist) {
      newPlaylist.links = newPlaylist.links.split(',');
      console.log(newPlaylist);
      ctrl.log = '';
      if (file) {
        if (!file.$error) {
          Upload.upload({
            url: '/api/playlist/upload',
            data: {
              data: newPlaylist,
              file: file
            }
          })
          .then(function(resp) {
            $timeout(function() {
              ctrl.log = 'file: ' +
              resp.config.data.file.name +
              ', Response: ' + JSON.stringify(resp.data) +
              '\n' + ctrl.log;
            });
          }, function(resp) {
            console.log('Error status: ' + resp.status);
          }, function(evt) {
            var progressPercentage = parseInt(100.0 *
              evt.loaded / evt.total, 10);
            ctrl.log = 'progress: ' + progressPercentage +
              '% ' + evt.config.data.file.name + '\n' +
              ctrl.log;
          });
        }
      }
    };
  }
})();

