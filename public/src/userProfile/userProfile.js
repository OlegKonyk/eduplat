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

  function userProfileCtrl(edAuthService) {
    "ngInject";

    var ctrl = this;

    ctrl.user = edAuthService.user;
    /*console.log("||||||||||||||||")
    console.log(edAuthService.user)*/

    edAuthService.getUser()
     .then(function(user) {
       ctrl.user = user;
     });
  }
})();

