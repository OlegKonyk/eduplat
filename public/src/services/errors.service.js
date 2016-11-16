(function() {
  'use strict';

  angular.module('app')
		.service('edErrorsService', edErrorsService);

  function edErrorsService(edToasterService) {
    "ngInject";
    var service = {handleError};

    function handleError(err) {
      let message = err.data ? err.data : err.statusText;
      edToasterService.showCustomToast({
        type: 'warning',
        message: 'Something went wrong: ' + message
      });
    }

    return service;
  }
})();
