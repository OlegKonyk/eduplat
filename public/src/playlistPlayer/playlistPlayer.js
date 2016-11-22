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

  function playlistPlayerCtrl($routeParams, edPlaylistService) {
    "ngInject";

    var ctrl = this;

    ctrl.id = $routeParams.id;

    edPlaylistService.publicResource
      .get({_id: ctrl.id})
      .$promise
      .then(function(playlist) {
        console.log(playlist);
        ctrl.playlist = playlist;
      }, function(err) {
        console.log(err);
      });
  }
})();

