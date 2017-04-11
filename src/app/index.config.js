(function() {
  'use strict';

  angular
    .module('maraveca')
    .config(config);

  /** @ngInject */
  function config($logProvider, $authProvider, SERVER) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
   /* toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;*/


    $authProvider.loginUrl  = SERVER + "/login/";
    $authProvider.signupUrl = SERVER + "/login/";
    $authProvider.tokenType = 'Token';
    $authProvider.withCredentials = false;


  }

})();
