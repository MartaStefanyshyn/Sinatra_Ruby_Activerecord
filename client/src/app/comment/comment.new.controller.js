(function() {
  'use strict';

  angular
    .module('sinatraRuby')
    .controller('CommentNewController', CommentNewController);

  /** @ngInject */
    function CommentNewController($scope, Comments, $location, DataHolder) {
      $scope.comment = {}
      $scope.comment.note_id = DataHolder.getValue();
      $scope.createNewComment = function () {
        Comments.save($scope.comment);
      }
      $scope.back = function () {
        $location.path('/comments');
      };
    }
})();
