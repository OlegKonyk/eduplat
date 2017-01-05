(function() {
  'use strict';
  angular.module('app.admin')
    .component('edGoogleSysAccount',
    {
      bindings: {},
      template: function($templateCache) {
        "ngInject";
        return $templateCache.get('public/src/admin/googleSysAccount/googleSysAccount.html');
      },
      controller: googleSysAccountCtrl
    }
  );

  function googleSysAccountCtrl(edAuthService, edGoogleSysAccountService) {
    "ngInject";

    var ctrl = this;

    ctrl.authenticateGoogleSysUser = function() {
      edGoogleSysAccountService.authenticate();
    };
  }
})();

