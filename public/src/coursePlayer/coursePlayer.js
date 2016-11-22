(function() {
  'use strict';
  angular.module('app')
    .component('edCoursePlayer',
    {
      bindings: {},
      template: function($templateCache) {
        "ngInject";
        return $templateCache.get('public/src/coursePlayer/coursePlayer.html');
      },
      controller: coursePlayerCtrl
    }
  );

  function coursePlayerCtrl() {
    "ngInject";

    var ctrl = this;
  }
})();

