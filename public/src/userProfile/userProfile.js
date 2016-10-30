(function() {
  'use strict';
  angular.module('app')
    .component('edUserProfile',
    {
      bindings: {},
      template: function($templateCache) {
        "ngInject";
        return $templateCache.get('public/src/userProfile/userProfile.html');
      },
      controller: userProfileCtrl
    }
  );

  function userProfileCtrl() {
    "ngInject";

    var ctrl = this;
  }
})();

