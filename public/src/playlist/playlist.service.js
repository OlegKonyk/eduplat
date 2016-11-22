angular.module('app').service('edPlaylistService', function($resource) {
  "ngInject";

  var personalResource = $resource(
    '/api/playlist/personal',
    {},
    {get: {method: 'GET', isArray: true}}
  );

  var featuredResource = $resource(
    '/api/playlist/featured',
    {},
    {get: {method: 'GET', isArray: true}}
  );

  var publicResource = $resource(
    '/api/playlist/public/',
    {_id: '@_id'}
  );

  return {personalResource, featuredResource, publicResource};
});
