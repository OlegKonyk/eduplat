(function() {
  'use strict';
  angular.module('app.playlists')
    .component('edPlaylists',
    {
      bindings: {},
      template: function($templateCache) {
        "ngInject";
        return $templateCache.get('public/src/playlists/playlists.html');
      },
      controller: playlistsCtrl
    }
  );

  function playlistsCtrl($location, $routeParams, $state) {
    "ngInject";

    var ctrl = this;

    ctrl.currentNavItem = 'myPlaylists';
  }
})();

