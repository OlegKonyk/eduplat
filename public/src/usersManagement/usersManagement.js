(function() {
  'use strict';
  angular.module('app')
    .component('edUsersManagement',
    {
      bindings: {},
      template: function($templateCache) {
        "ngInject";
        return $templateCache.get('public/src/usersManagement/usersManagement.html');
      },
      controller: usersManagementCtrl
    }
  );

  function usersManagementCtrl($resource) {
    "ngInject";

    var ctrl = this;

    var usersResource = $resource('/api/users', {}, { get: { method: 'GET', isArray: true } });

    usersResource.get().$promise
      .then(function(users) {
        ctrl.users = users;
      });
  }
})();

