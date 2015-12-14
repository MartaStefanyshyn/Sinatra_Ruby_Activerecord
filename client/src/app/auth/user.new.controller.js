(function() {
  'use strict';

  angular
    .module('sinatraRuby')
    .controller('UserNewController', UserNewController);

  /** @ngInject */
    function UserNewController($scope, Users, $location) {
      $scope.user = {}
      $scope.createNewUser = function () {
        Users.save($scope.user);
      }
      $scope.back = function () {
        $location.path('/users');
      };
    }
})();
