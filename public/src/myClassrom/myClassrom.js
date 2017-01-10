(function() {
  'use strict';
  angular.module('app')
    .component('edMyClassrom',
    {
      bindings: {},
      template: function($templateCache) {
        "ngInject";
        return $templateCache.get('public/src/myClassrom/myClassrom.html');
      },
      controller: myClassromCtrl
    }
  );

  function myClassromCtrl() {
    "ngInject";

    var ctrl = this;
  }
})();

