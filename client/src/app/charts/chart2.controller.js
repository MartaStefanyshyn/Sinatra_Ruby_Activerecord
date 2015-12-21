(function() {
  'use strict';

  angular
    .module('sinatraRuby')
    .controller('Charts2Controller', Charts2Controller);


  /** @ngInject */
  function Charts2Controller($scope, $location, $http, $filter) {
    $scope.labels = [];
    $scope.scores = [];
    $scope.data = [];
    console.log($scope.chart);
    $http.get('/api/comments_group').success(function(response) {
      response.forEach(function(value) {
        $scope.labels.push($filter('date')(new Date(value.created_at),'dd-MM-yyyy'));
        $scope.scores.push(value.count);
      });
      $scope.data.push($scope.scores);
    });
  };
})();
