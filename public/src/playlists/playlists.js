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

  function playlistsCtrl($location, $routeParams) {
    "ngInject";

    var ctrl = this;

    ctrl.tabs = ['myPlaylists', 'addPlaylist'];

    if ($routeParams.tab) {
      //console.log($routeParams.tab)
    }

    //$location.path('/playlists/').search({tab: 'myPlaylists'});

    //ctrl.tabIndex = 0;

    /*ctrl.asignTab = function(tab) {
      console.log("<><><<><><><><>");
      console.log(tab);
      $location.path('/playlists/').search({tab: tab});
    };*/
  }
})();

