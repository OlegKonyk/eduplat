(function() {
  'use strict';
  angular.module('app.hero')
    .component('edFeaturedPlaylists',
    {
      bindings: {},
      template: function($templateCache) {
        "ngInject";
        return $templateCache.get('public/src/hero/featuredPlaylists/featuredPlaylists.html');
      },
      controller: featuredPlaylistsCtrl
    }
  );

  function featuredPlaylistsCtrl($scope, edPlaylistsService, $location, $state) {
    "ngInject";

    var ctrl = this;

    edPlaylistsService.featuredResource
      .get()
      .$promise
      .then(function(playlists) {
        console.log(playlists);
        ctrl.featuredPlaylists = playlists;
      }, function(err) {
        console.log(err);
      });

    ctrl.goToPlaylist = function(id) {
      $state.go('player', {video: id});
    };
  }
})();

