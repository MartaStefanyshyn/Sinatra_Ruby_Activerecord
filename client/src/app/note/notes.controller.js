(function() {
  'use strict';

  angular
    .module('sinatraRuby')
    .controller('NotesController', NotesController);


  /** @ngInject */
  function NotesController($scope, Notes, $location) {
    $scope.notes = Notes.query();
    $scope.deleteNote = function (noteId) {
      Notes.destroy({ id: noteId });
      $scope.notes = Notes.query();
    };
    $scope.showNote = function (noteId) {
      $location.path('/notes/' + noteId);
    };
    $scope.editNote = function (noteId) {
      $location.path('/notes/' + noteId + '/_edit');
    };
    $scope.createNote = function () {
      $location.path('/notes_new');
    };
  }
})();
