(function() {
  'use strict';

  angular
    .module('sinatraRuby')
    .controller('NoteShowController', NoteShowController);

  /** @ngInject */
    function NoteShowController($scope, Notes, $stateParams, $location) {
      $scope.note = Notes.show({id: $stateParams.id});
      $scope.back = function () {
        $location.path('/notes');
      };
      $scope.updateNote = function () {
        Notes.update({id: $scope.note.id}, $scope.note);
        console.log($scope.note.id);
        console.log($scope.note);
      };
    }
})();
