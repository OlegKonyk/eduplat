(function() {
  'use strict';

  angular.module('app')
    .controller('edToasterCtrl', edToasterCtrl);

  function edToasterCtrl($window, $mdToast, edToasterService) {
    "ngInject";
    var ctrl = this;

    ctrl.options = edToasterService.options;
    ctrl.closeToast = closeToast;
    ctrl.openMoreInfo = openMoreInfo;

    function closeToast() {
      if (ctrl.isDlgOpen) return;
      $mdToast
        .hide()
        .then(function() {
          ctrl.isDlgOpen = false;
        });
    }

    function openMoreInfo(link) {
      $window.open(link, '_blank');
    }
  }
})();
