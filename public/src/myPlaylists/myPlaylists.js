(function() {
  'use strict';
  angular.module('app')
    .component('edMyPlaylists',
    {
      bindings: {},
      template: function($templateCache) {
        "ngInject";
        return $templateCache.get('public/src/myPlaylists/myPlaylists.html');
      },
      controller: myPlaylistsCtrl
    }
  );

  function myPlaylistsCtrl($resource) {
    "ngInject";

    var ctrl = this;

    var playlistResource = $resource(
      '/api/playlist/',
      {},
      {get: {method: 'GET', isArray: true}}
    );

    ctrl.addPlaylist = function(newPlaylist) {
      newPlaylist.links = newPlaylist.links.split(',');
      playlistResource
        .save(newPlaylist)
        .$promise
        .then(function(something) {
          console.log(something);
        }, function(err) {
          console.log(err);
        });
    };

    ctrl.newPlaylist = {};

    playlistResource
      .get()
      .$promise
      .then(function(playlists) {
        console.log(playlists);
        ctrl.playlists = playlists;
      }, function(err) {
        console.log(err);
      });
  }
})();

