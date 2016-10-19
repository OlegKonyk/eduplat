(function() {
  'use strict';
  angular
  .module('app', ['ngRoute', 'ngMaterial'])
  .config(config)
  .component('edAbout', {
    template: '<md-content class="md-padding"><h1>ABOUT</h1></md-content>'
  })
  .component('edHome', {
    template: '<md-content class="md-padding"><h1>HOME</h1></md-content>'
  });

  function config($mdThemingProvider, $mdIconProvider,
                 $routeProvider, $locationProvider) {
    "ngInject";
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        template: '<ed-home></ed-home>'
      })
      .when('/about', {
        template: '<ed-about></ed-about>'
      })
      .when('/signin', {
        template: '<ed-signin></ed-signin>'
      })
      .when('/signup', {
        template: '<ed-signup></ed-signup>'
      })
      .otherwise({
        redirectTo: '/'
      });

    /* $mdIconProvider
        .defaultIconSet("./assets/svg/avatars.svg", 128)
        .icon("menu", "./assets/svg/menu.svg", 24) */

    $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('yellow');
  }
})();

