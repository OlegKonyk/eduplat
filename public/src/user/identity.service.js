angular.module('app').service('edIdentityService', function($resource) {
  "ngInject";
  var currentUser;

  var userResource = $resource(
    '/api/user/',
    {_id: '@_id'}
  );

  return {
    currentUser: currentUser,
    userResource: userResource
  };
});
