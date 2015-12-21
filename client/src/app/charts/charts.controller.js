(function() {
  'use strict';

  angular
    .module('sinatraRuby')
    .controller('ChartsController', ChartsController);


  /** @ngInject */
  function ChartsController($scope, $location, $http) {
    $scope.labels = [];
    $scope.scores = [];
    $scope.data = [];
    console.log($scope.chart);
    $http.get('/api/count').success(function(response) {
      response.forEach(function(value) {
        $scope.labels.push(value.title);
        $scope.scores.push(value.count);
      });
      $scope.data.push($scope.scores);
    });
  };
})();
