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

  function googleSysAccountCtrl(edAuthService, edGoogleSysAccountService, $interval) {
    "ngInject";

    var ctrl = this;
    ctrl.status = {};
    // ctrl.authorising = true;
    // $interval(() => {
    //   ctrl.authorising = !!!ctrl.authorising;
    //   console.log(ctrl.authorising)
    // }, 2000)
    
    ctrl.linkGoogleSysUser = function() {
      ctrl.authorising = true;
      edGoogleSysAccountService.link()
        .then(ctrl.getStatus)
        .then(function() {
          ctrl.authorising = false;
        }, function() {
          ctrl.authorising = false;
        });
    };

    ctrl.unlinkGoogleSysUser = function() {
      edGoogleSysAccountService.unlink()
        .then(ctrl.getStatus);
    };

    ctrl.getStatus = function() {
      return edGoogleSysAccountService.getStatus()
        .then(function(res) {
          ctrl.status = res;
        }, function(err) {
          console.log(err);
          ctrl.status = {isAuth: false};
        });
    };
    ctrl.getStatus();
  }
})();

