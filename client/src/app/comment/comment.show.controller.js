(function() {
  'use strict';

  angular
    .module('sinatraRuby')
    .controller('CommentShowController', CommentShowController);

  /** @ngInject */
    function CommentShowController($scope, Comments, $stateParams, $location) {
      $scope.comment = Comments.show({id: $stateParams.id});
      $scope.back = function () {
        $location.path('/comments');
      };
      $scope.updateComment= function () {
        Comments.update({id: $scope.comment.id}, $scope.comment);
      };
    }
})();
