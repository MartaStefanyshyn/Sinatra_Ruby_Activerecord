(function() {
  'use strict';

  angular
    .module('sinatraRuby')
    .controller('CommentsController', CommentsController);


  /** @ngInject */
  function CommentsController($scope, Comments, $location) {
    $scope.comments = Comments.query();
    $scope.deleteComment = function (commentId) {
      Comments.destroy({ id: commentId });
      $scope.comments = Comments.query();
    };
    $scope.showComment = function (commentId) {
      $location.path('/comments/' + commentId);
    };
    $scope.editComment = function (commentId) {
      $location.path('/comments/' + commentId + '/_edit');
    };
    $scope.createComment = function () {
      $location.path('/comments_new');
    };
  }
})();
