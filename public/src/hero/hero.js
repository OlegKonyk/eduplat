(function() {
  'use strict';
  angular.module('app.hero')
    .component('edHero',
    {
      bindings: {},
      template: function($templateCache) {
        "ngInject";
        return $templateCache.get('public/src/hero/hero.html');
      },
      controller: heroCtrl
    }
  );

  function heroCtrl($scope, edPlaylistsService, $location, $state) {
    "ngInject";

    var ctrl = this;

    edPlaylistsService.featuredResource
      .get()
      .$promise
      .then(function(playlists) {
        console.log(playlists);
        ctrl.featuredPlaylists = playlists;
      }, function(err) {
        console.log(err);
      });

    ctrl.goToPlaylist = function(id) {
      $state.go('player', {video: id});
    };

    ctrl.asighnVisibility = function(visibility, prop) {
      if (!ctrl[prop]) {
        ctrl[prop] = visibility;
      }
    };

    /*$scope.$watch('$ctrl.myDivIsVisible', function(){
      console.log("^^^^^^^");
      console.log(ctrl.myDivIsVisible);
    })*/

    ctrl.slides = [/*{
      id: 0,
      src: 'front/assets/img/1.jpeg'
    },*/
    {
      id: 1,
      src: 'front/assets/img/2.jpeg'
    },
    {
      id: 2,
      src: 'front/assets/img/3.jpeg'
    }];
    ctrl.carouselIndex = 0;
  }
})();

