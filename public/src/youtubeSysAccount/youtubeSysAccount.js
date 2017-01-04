(function() {
  'use strict';
  angular.module('app')
    .component('edYoutubeSysAccount',
    {
      bindings: {},
      template: function($templateCache) {
        "ngInject";
        return $templateCache.get('public/src/youtubeSysAccount/youtubeSysAccount.html');
      },
      controller: youtubeSysAccountCtrl
    }
  );

  function youtubeSysAccountCtrl(edAuthService) {
    "ngInject";

    var ctrl = this;

    ctrl.authenticateYoutubeSysUser = function() {
      edAuthService.authenticateYoutubeSysUser();
    };
  }
})();

