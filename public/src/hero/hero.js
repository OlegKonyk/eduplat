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

  function heroCtrl(edPlaylistService, $location) {
    "ngInject";

    var ctrl = this;

    edPlaylistService.featuredResource
      .get()
      .$promise
      .then(function(playlists) {
        console.log(playlists);
        ctrl.featuredPlaylists = playlists;
      }, function(err) {
        console.log(err);
      });

    ctrl.goToPlaylist = function(id) {
      console.log(`/playlist/public/${id}`);
      $location.path(`/playlist/public/${id}`);
    };
  }
})();

