(function() {
  'use strict';

  angular
    .module('sinatraRuby')
    .controller('Charts2Controller', Charts2Controller);


  /** @ngInject */
  function Charts2Controller($scope, $location, $http) {
    $scope.labels = [];
    $scope.scores = [];
    $scope.data = [];
    console.log($scope.chart);
    $http.get('/api/comments').success(function(response) {
      response.forEach(function(value) {
        $scope.labels.push(value.content);
        $scope.scores.push(value.created_at);
      });
      $scope.data.push($scope.scores);
      console.log($scope.data)
    });
  };
})();
