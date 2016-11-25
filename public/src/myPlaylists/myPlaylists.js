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

