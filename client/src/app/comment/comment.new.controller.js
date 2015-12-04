(function() {
  'use strict';

  angular
    .module('sinatraRuby')
    .controller('CommentNewController', CommentNewController);

  /** @ngInject */
    function CommentNewController($scope, Comments, $location) {
      $scope.comment = {}
      $scope.createNewComment = function () {
        Comments.save($scope.comment);
      }
      $scope.back = function () {
        $location.path('/comments');
      };
    }
})();
