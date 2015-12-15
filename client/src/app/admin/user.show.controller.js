(function() {
  'use strict';

  angular
    .module('sinatraRuby')
    .controller('UserController', UserController);


  /** @ngInject */
    function UserController($scope, Users, $location, $stateParams) {
      $scope.user = Users.show({id: $stateParams.id});
      $scope.updateUser = function () {
        Users.update({id: $scope.user.id}, $scope.user);
      };
      $scope.back = function() {
        $location.path('/admin/users');
      }
    }
})();
