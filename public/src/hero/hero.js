(function() {
  'use strict';
  angular.module('app')
    .component('edHero',
    {
      bindings: {},
      template: function($templateCache) {
        "ngInject";
        return $templateCache.get('public/src/hero/hero.html');
      },
      controller: heroCtrl
    }
  );

  function heroCtrl(edPlaylistsService, $location, $state) {
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

