(function() {
  'use strict';
  angular.module('app')
    .component('edPlaylistEditor',
    {
      bindings: {},
      template: function($templateCache) {
        "ngInject";
        return $templateCache.get('public/src/playlistEditor/playlistEditor.html');
      },
      controller: playlistEditorCtrl
    }
  );

  function playlistEditorCtrl() {
    "ngInject";

    var ctrl = this;
  }
})();

