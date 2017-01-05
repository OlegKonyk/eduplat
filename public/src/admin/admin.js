(function() {
  'use strict';
  angular.module('app.admin')
    .component('edAdmin',
    {
      bindings: {},
      template: function($templateCache) {
        "ngInject";
        return $templateCache.get('public/src/admin/admin.html');
      },
      controller: adminCtrl
    }
  );

  function adminCtrl() {
    "ngInject";

    var ctrl = this;
  }
})();

