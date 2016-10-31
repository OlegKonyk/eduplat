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

  function heroCtrl() {
    "ngInject";

    var ctrl = this;
  }
})();

