(function() {
  'use strict';

  angular
    .module('sinatraRuby')
    .controller('UsersController', UsersController);


  /** @ngInject */
    function UsersController($scope, Users, $location) {
      $scope.users = Users.query();
      $scope.deleteUser = function (userId) {
        Users.destroy({ id: userId });
        $scope.users = Users.query();
      };
      $scope.showUser = function (userId) {
        $location.path('/admin/users/' + userId);
      };
      $scope.editUser = function (userId) {
        $location.path('/admin/users/' + userId + '/_edit');
      };
      $scope.createUser = function () {
        $location.path('/admin/users_new');
      };
    }
})();
