(function() {
  'use strict';
  angular.module('app.playlists')
    .component('edPlaylistPlayer',
    {
      bindings: {},
      template: function($templateCache) {
        "ngInject";
        return $templateCache.get('public/src/playlists/playlistPlayer/playlistPlayer.html');
      },
      controller: playlistPlayerCtrl
    }
  );

  function playlistPlayerCtrl($stateParams, $routeParams, $sce, edPlaylistsService) {
    "ngInject";

    var ctrl = this;
    ctrl.video = $stateParams.video;

    edPlaylistsService.publicResource
      .get({_id: ctrl.video})
      .$promise
      .then(function(playlist) {
        ctrl.playlist = playlist;
        ctrl.currentVideo = ctrl.playlist.links[0].id;
      }, function(err) {
        console.log(err);
      });

    ctrl.setVideoUrl = function(url) {
      ctrl.currentVideo = url;
      console.log(url);
    };
  }
})();

