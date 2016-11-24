(function() {
  'use strict';
  angular.module('app')
    .component('edPlaylistPlayer',
    {
      bindings: {},
      template: function($templateCache) {
        "ngInject";
        return $templateCache.get('public/src/playlistPlayer/playlistPlayer.html');
      },
      controller: playlistPlayerCtrl
    }
  );

  function playlistPlayerCtrl($routeParams, $sce, edPlaylistService) {
    "ngInject";

    var ctrl = this;

    ctrl.id = $routeParams.id;

    edPlaylistService.publicResource
      .get({_id: ctrl.id})
      .$promise
      .then(function(playlist) {
        ctrl.playlist = playlist;
        ctrl.currentVideo = ctrl.playlist.links[0];
      }, function(err) {
        console.log(err);
      });

    ctrl.setVideoUrl = function(url) {
      ctrl.currentVideo = url;
      console.log(url);
    };
  }
})();

