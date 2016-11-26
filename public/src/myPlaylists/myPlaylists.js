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

  function myPlaylistsCtrl(edAuthService, edPlaylistsService) {
    "ngInject";

    var ctrl = this;

    function grtPlaylists() {
      return edPlaylistsService.personalResource
        .get()
        .$promise
        .then(function(playlists) {
          console.log(playlists);
          ctrl.playlists = playlists;
        });
    }

    grtPlaylists()
      .then(null,
        function(err) {
          console.log(err);
        });

    ctrl.deletePlaylist = function(_id) {
      console.log(_id);
      edPlaylistsService.personalResource
        .delete({_id: _id})
        .$promise
        .then(grtPlaylists,
          function(err) {
            console.log(err);
          });
    };
  }
})();

