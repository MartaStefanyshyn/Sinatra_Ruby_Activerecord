(function() {
  'use strict';

  angular
    .module('sinatraRuby')
    .controller('NoteNewController', NoteNewController);

  /** @ngInject */
    function NoteNewController($scope, Notes, $location) {
      $scope.note = {}
      $scope.createNewNote = function () {
        Notes.save($scope.note);
      }
      $scope.back = function () {
        $location.path('/notes');
      };
    }
})();
