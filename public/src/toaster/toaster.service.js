(function() {
  'use strict';

  angular.module('app')
		.service('edToasterService', edToasterService);

  function edToasterService($mdToast) {
    "ngInject";
    var service = {
      showCustomToast: showCustomToast
    };

    function showCustomToast(opt) {
      service.options = opt;
      var delay = opt.action ? 8000 : 4000;
      $mdToast.show({
        hideDelay: delay,
        position: 'top right',
        controller: 'edToasterCtrl',
        controllerAs: '$ctrl',
        template: [
          '<md-toast style="z-index: 99999">',
            '<div class="md-toast-text toast-{{$ctrl.options.type}}" >{{$ctrl.options.message}}</div>',
            '<md-button ng-if="$ctrl.options.action" class="md-highlight" ng-click="$ctrl.openMoreInfo($ctrl.options.action.link)">',
                '<span style="color: #424242" ng-if="!$ctrl.options.action.label">Go there</span>',
                '<span style="color: #424242" ng-if="$ctrl.options.action.label">{{$ctrl.options.action.label}}</span>',
            '</md-button>',
            '<span flex class="flex"></span>',
            '<md-button style="margin-right: -13px;" class="md-icon-button" ng-click="$ctrl.closeToast()">',
                '<md-icon style="fill: white;" md-svg-src="front/assets/svg/close.svg"></md-icon>',
            '</md-button>',
          '</md-toast>'
        ].join('')
      });
    }

    return service;
  }
})();
