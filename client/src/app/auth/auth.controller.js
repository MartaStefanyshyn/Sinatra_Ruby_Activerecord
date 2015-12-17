(function() {
  'use strict';

  angular
    .module('sinatraRuby')
    .controller('AuthController', AuthController);


  /** @ngInject */
    function AuthController($scope, Users, $location, $http, Flash) {
      $scope.exist = Users.logged_in();
      $scope.signUp = function(){
        function success(response) {
          Flash.create('success', 'You was successfully signed up.', 'custom-class');
          $location.path('/');
        }
        function failure(response) {
          angular.forEach(response.data, function(errors, key) {
            angular.forEach(errors, function(e) {
              $scope.form[key].$dirty = true;
              $scope.form[key].$setValidity(e, false);
            });
          });
        }
        Users.signup($scope.user, success, failure);
      };
      $scope.logIn = function(){
        function success(response) {
          Flash.create('success', 'You was successfully loged in.', 'custom-class');
          $location.path('/');
        }
        function failure(response) {
          Flash.create('danger', 'Invalid email or password', 'custom-class');
        }
        Users.login($scope.user, success, failure);
      };
      $scope.logInFB = function(){
        FB.login(function(response) {
            if (response.authResponse) {
             FB.api('/me', function(response) {
               console.log('Good to see you, ' + response.name + '.');
               $scope.user = {
                username: response.name,
                password: response.id
               };
               Users.send_u($scope.user);
             });
            } else {
             console.log('User cancelled login or did not fully authorize.');
            }
        });
      };
      $scope.logOut = function(){
        function success(response) {
          Flash.create('success', 'You was successfully loged out.', 'custom-class');
          $location.path('/');
        }
        function failure(response) {
          angular.forEach(response.data, function(errors, key) {
            angular.forEach(errors, function(e) {
              $scope.form[key].$dirty = true;
              $scope.form[key].$setValidity(e, false);
            });
          });
        }
        Users.logout(success, failure);
      };
      $scope.errorClass = function(name) {
        var s = $scope.form[name];
        return s.$invalid && s.$dirty ? "error" : "";
      };

      $scope.errorMessage = function(name) {
        var s = $scope.form[name].$error;
        var result = [];
        angular.forEach(s, function(key, value) {
          result.push(value);
        });
        return result.join(" ");
      };
    }
})();
