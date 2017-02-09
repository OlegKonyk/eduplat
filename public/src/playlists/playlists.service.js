(function() {
  'use strict';
  angular
    .module('app.playlists')
    .service('edPlaylistsService', function($resource) {
      "ngInject";

      var personalResource = $resource(
        '/api/playlist/personal',
        {},
        {
          get: {method: 'GET', isArray: true},
          update: {method: 'PUT'}
        }
      );

      var featuredResource = $resource(
        '/api/playlist/featured',
        {},
        {get: {method: 'GET', isArray: true}}
      );

      var playlistsByCategoryResource = $resource(
        '/api/playlist/catalog',
        {categoryName: '@category'},
        {get: {method: 'GET', isArray: true}}
      );

      var publicResource = $resource(
        '/api/playlist/public/',
        {_id: '@_id'}
      );

      var fetchYoutubeResource = $resource(
        '/api/playlist/fetchYoutubeData/'
      );

      return {personalResource, featuredResource, publicResource, fetchYoutubeResource, playlistsByCategoryResource};
    });
})();

