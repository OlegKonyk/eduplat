(function() {
  'use strict';
  angular.module('app.playlists')
    .component('edMyPlaylists',
    {
      bindings: {},
      template: function($templateCache) {
        "ngInject";
        return $templateCache.get('public/src/playlists/myPlaylists/myPlaylists.html');
      },
      controller: myPlaylistsCtrl
    }
  );

  function myPlaylistsCtrl(edAuthService, edPlaylistsService) {
    "ngInject";

    var ctrl = this;

    function getPlaylists() {
      return edPlaylistsService.personalResource
        .get()
        .$promise
        .then(function(playlists) {
          console.log(playlists);
          ctrl.playlists = playlists;
        });
    }

    getPlaylists()
      .then(null,
        function(err) {
          console.log(err);
        });

    ctrl.updatePlaylist = function(playlist) {
      edPlaylistsService.personalResource
        .update({_id: playlist._id}, {isFeatured: playlist.isFeatured})
        .$promise
        .then(function(data) {
          Object.assign(playlist, data);
        }, function(err) {
          console.log(err);
        });
    };

    ctrl.deletePlaylist = function(_id) {
      console.log(_id);
      edPlaylistsService.personalResource
        .delete({_id: _id})
        .$promise
        .then(getPlaylists,
          function(err) {
            console.log(err);
          });
    };
  }
})();

