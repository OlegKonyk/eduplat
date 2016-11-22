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

  function myPlaylistsCtrl(edAuthService, edPlaylistService) {
    "ngInject";

    var ctrl = this;

    ctrl.user = edAuthService.user;

    ctrl.groups = edAuthService.user.owner
      .map(group => {
        return {name: group};
      });

    ctrl.addPlaylist = function(newPlaylist) {
      newPlaylist.links = newPlaylist.links.split(',');
      edPlaylistService.personalResource
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

    edPlaylistService.personalResource
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

