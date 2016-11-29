(function() {
  'use strict';
  angular.module('app')
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

    console.log('still getting here');
    ctrl.currentNavItem = 'myPlaylists';
    $state.go('playlists.myPlaylists');
  }
})();
