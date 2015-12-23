(function() {
  'use strict';

  angular
    .module('sinatraRuby')
    .controller('NoteShowController', NoteShowController);

  /** @ngInject */
    function NoteShowController($scope, Notes, $stateParams, $location, Comments, DataHolder, $window) {
      $scope.note = Notes.show({id: $stateParams.id});
      $scope.back = function () {
        $location.path('/notes');
      };
      $scope.updateNote = function () {
        Notes.update({id: $scope.note.note.id}, $scope.note.note);
        console.log($scope.note.note.id);
        console.log($scope.note.note);
      };
      $scope.addComment = function(noteId, parentId){
        DataHolder.setValue(noteId, parentId);
        $location.path('/comments_new');
      };
      $scope.deleteComment = function(commentId){
        Comments.destroy({ id: commentId });
        $window.location.reload();
      };
      $scope.editComment = function (commentId) {
        $location.path('/comments/' + commentId + '/_edit');
      };
    }
})();
