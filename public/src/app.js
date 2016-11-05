(function() {
  'use strict';
  angular
  .module('app', ['ngRoute', 'ngMaterial', 'ngMessages', 'satellizer'])
  .config(config)
  .component('edAbout', {
    template: '<md-content class="md-padding"><h1>ABOUT</h1></md-content>'
  })
  .component('edHome', {
    template: '<md-content class="md-padding"><h1>HOME</h1></md-content>'
  })
  .constant('API_URL', 'http://localhost:3030/')
  .factory('authInterceptor', function($injector) {
    return {
      request: function(config) {
        // injected manually to get around circular dependency problem.
        var $auth = $injector.get('$auth');
        var token = $auth.getToken();
        if (token) {
          config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
      },
      response: function(response) {
        return response;
      }
    };
  });

  function config($mdThemingProvider, $mdIconProvider,
                 $routeProvider, $locationProvider, $authProvider, API_URL, $httpProvider) {
    "ngInject";
    $locationProvider.html5Mode(true);

    $authProvider.loginUrl = API_URL + 'api/login';
    $authProvider.signupUrl = API_URL + 'api/register';

    $httpProvider.interceptors.push('authInterceptor');

    $authProvider.google({
      clientId: '180115616906-3dekl0d823bbm280f1hidk1kk41cd9fl.apps.googleusercontent.com',
      url: API_URL + 'api/auth/google',
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
      //redirectUri: $window.location.origin,
      requiredUrlParams: ['scope'],
      optionalUrlParams: ['display'],
      scope: ['profile', 'email', 'https://gdata.youtube.com'],
      scopePrefix: 'openid',
      scopeDelimiter: ' ',
      display: 'popup',
      oauthType: '2.0',
      popupOptions: { width: 452, height: 633 }
    });

    /*$authProvider.google({
      clientId: '180115616906-3dekl0d823bbm280f1hidk1kk41cd9fl.apps.googleusercontent.com',
      url: API_URL + 'api/auth/google'
    });*/

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

