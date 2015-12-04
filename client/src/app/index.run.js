(function() {
  'use strict';

  angular
    .module('sinatraRuby')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
