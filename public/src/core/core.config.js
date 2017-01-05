(function() {
  'use strict';
  angular
  .module('app.core')
  .config(config)
  .component('edAbout', {
    template: '<md-content class="md-padding"><h1>ABOUT</h1></md-content>'
  })
  //.constant('API_URL', 'http://localhost:3030/')
  .factory('authInterceptor', function($injector) {
    return {
      request: function(config) {
        // injected manually to get around circular dependency problem.
        var $auth = $injector.get('$auth');
        var token = $auth.getToken();
        if (token) {
          config.headers.Authorization = token;// 'Bearer ' + token;
        }
        return config;
      },
      response: function(response) {
        return response;
      }
    };
}).run(function($window) {
  var params = $window.location.search.substring(1);
  if (params && $window.opener.location.origin === $window.location.origin) {
    var pair = params.split('=');
    var code = decodeURIComponent(pair[1]);

    $window.opener.postMessage(code, $window.location.origin);
    }
});

  function config($mdThemingProvider, $mdIconProvider, $stateProvider, $urlRouterProvider,
                 $locationProvider, $authProvider, $httpProvider, $compileProvider) {
    "ngInject";
    $locationProvider.html5Mode(true);
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|ftp|blob):|data:image\//);
    $authProvider.loginUrl = 'api/auth/login';
    $authProvider.signupUrl = 'api/auth/register';

    $httpProvider.interceptors.push('authInterceptor');

    $authProvider.google({
      clientId: '180115616906-3dekl0d823bbm280f1hidk1kk41cd9fl.apps.googleusercontent.com',
      url: 'api/auth/google',
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
      // redirectUri: $window.location.origin,
      requiredUrlParams: ['scope'],
      optionalUrlParams: ['display'],
      scope: ['profile', 'email', 'https://gdata.youtube.com'],
      scopePrefix: 'openid',
      scopeDelimiter: ' ',
      display: 'popup',
      oauthType: '2.0',
      popupOptions: {width: 452, height: 633}
    });

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
          url: '/',
          template: '<ed-hero></ed-hero>'
        })
        .state('about', {
          url: '/about',
          template: '<ed-about></ed-about>'
        })
        .state('signin', {
          url: '/signin',
          template: '<ed-signin></ed-signin>'
        })
        .state('signup', {
          url: '/signup',
          template: '<ed-signup></ed-signup>'
        })
        .state('profile', {
          url: '/profile',
          template: '<ed-user-profile></ed-user-profile>'
        })
        .state('admin', {
          url: '/admin',
          template: '<ed-admin></ed-admin>',
          redirectTo: 'admin.googleSysAccount'
        })
        .state('admin.googleSysAccount', {
          url: '/googleSysAccount',
          template: '<ed-google-sys-account></ed-google-sys-account>'
        })
        .state('admin.usersManagement', {
          url: '/usersManagement',
          template: '<ed-users-management></ed-users-management>'
        })

        .state('playlists', {
          url: '/playlists',
          template: '<ed-playlists></ed-playlists>',
          redirectTo: 'playlists.myPlaylists'
        })
        .state('playlists.myPlaylists', {
          url: '/myPlaylists',
          template: '<ed-my-playlists></ed-my-playlists>',
          resolve: {getCurrentUser: getCurrentUser}
        })
        .state('playlists.addPlaylist', {
          url: '/addPlaylist',
          template: '<ed-playlist-editor></ed-playlist-editor>',
          resolve: {getCurrentUser: getCurrentUser}
        })

        .state('player', {
          url: '/playlist/public?video',
          template: '<ed-playlist-player></ed-playlist-player>'
        });

    $mdIconProvider
        //.defaultIconSet("./assets/svg/avatars.svg", 128)
        .icon("menu", "front/assets/svg/menu.svg", 24)
        .icon("chevron_right", "front/assets/svg/chevron_right.svg", 24)
        .icon("chevron_left", "front/assets/svg/chevron_left.svg", 24);

    $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('red');

    function getCurrentUser(edAuthService) {
      return edAuthService.getUser();
    }
  }
})();
