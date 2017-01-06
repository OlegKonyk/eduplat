(function() {
  'use strict';

  angular.module('app.admin')
		.service('edGoogleSysAccountService', edGoogleSysAccountService);

  function edGoogleSysAccountService($rootScope, $resource, $auth,
                         edToasterService, $location,
                         edErrorsService, $window, $http, $q) {
    "ngInject";
    var service = {
      link,
      unlink,
      getStatus
    };

    var googleSystemUserResource = $resource(
      '/api/admin/googleSystemUser',
      {code: '@code'},
      {post: {method: 'POST'}}
    );

    var googleSystemUserStatusResource = $resource(
      '/api/admin/googleSystemUser/status'
    );

    function getStatus() {
      return googleSystemUserStatusResource.get().$promise;
    }

    function link() {
      var options = `width=500,height=600,left=${($window.outerWidth - 500) / 2},top=${($window.outerHeight - 500) / 2.5}`;
      var popup = $window.open('', '', options);
      return googleSystemUserResource.post().$promise
        .then(function(res) {
          var url = res.url;
          popup.location = url;
        })
        .then(asyncPopupMsgHandler)
        .then(getTockens)
        .then(function(jwt) {
          popup.close();
        },
        function(err) {
          console.log(err);
        });
    }

    function unlink() {
      return googleSystemUserResource.delete().$promise;
    }

    function asyncPopupMsgHandler() {
      return new Promise(function(resolve, reject) {
        $window.addEventListener('message', function(event) {
          if (event.origin === $window.location.origin) {
            var code = event.data;
            resolve(code);
          } else {
            reject('Not able to retrive the code');
          }
        });
      });
    }

    function getTockens(code) {
      return googleSystemUserResource.get({
        code: code
      }).$promise;
    }

    return service;
  }
})();
