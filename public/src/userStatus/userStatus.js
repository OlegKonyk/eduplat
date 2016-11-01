(function() {
  'use strict';
  angular.module('app')
    .component('edUserStatus',
    {
      bindings: {},
      template: function($templateCache) {
        "ngInject";
        return $templateCache.get('public/src/userStatus/userStatus.html');
      },
      controller: userStatusCtrl
    }
  );

  function userStatusCtrl() {
    "ngInject";

    var ctrl = this;
  }
})();

