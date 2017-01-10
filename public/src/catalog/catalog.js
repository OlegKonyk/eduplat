(function() {
  'use strict';
  angular.module('app')
    .component('edCatalog',
    {
      bindings: {},
      template: function($templateCache) {
        "ngInject";
        return $templateCache.get('public/src/catalog/catalog.html');
      },
      controller: catalogCtrl
    }
  );

  function catalogCtrl() {
    "ngInject";

    var ctrl = this;
  }
})();

