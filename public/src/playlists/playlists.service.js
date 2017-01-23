(function() {
  'use strict';
  angular
    .module('app.playlists')
    .service('edPlaylistsService', function($resource) {
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

      var fetchYoutubeResource = $resource(
        '/api/playlist/fetchYoutubeData/'
      );

      return {personalResource, featuredResource, publicResource, fetchYoutubeResource};
    });
})();

