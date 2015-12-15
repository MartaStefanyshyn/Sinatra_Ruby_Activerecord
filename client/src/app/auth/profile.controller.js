(function() {
  'use strict';

  angular
    .module('sinatraRuby')
    .controller('ProfileController', ProfileController);


  /** @ngInject */
    function ProfileController($scope, Users, $location, $stateParams) {
      $scope.user = Users.show({id: $stateParams.id});
      $scope.editProfile = function () {
        $location.path('/profile/_edit');
      };
      $scope.updateProfile = function () {
        console.log($stateParams.id);
        Users.update({id: $stateParams.id}, $scope.user);
        $location.path('/profile');
      };
      $scope.back = function() {
        $location.path('/profile');
      }
    }
})();
