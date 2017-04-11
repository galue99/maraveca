(function() {
  'use strict';

  angular
    .module('maraveca')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
