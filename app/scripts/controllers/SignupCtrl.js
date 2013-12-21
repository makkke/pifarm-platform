'use strict';

pinapleApp
  .controller('SignupCtrl', ['$scope', 'DataSvc', function ($scope, DataSvc) {

    $scope.signup = function (user, form) {
      if( form.$valid ) {
        $scope.startSpinner();
        
        if( !$scope.checkPasswordLength( user.password ) ) {
          $scope.stopSpinner();
          $scope.error = 'min';
          return;
        }

        if( !$scope.checkPasswordsMatch( user.password, user.passwordConfirmation ) ) {
          $scope.stopSpinner();
          $scope.error = 'match';
          return;
        }

        // do sign up to server
      }
    }

    $scope.startSpinner = function () {
      $scope.loading = true;
    };

    $scope.stopSpinner = function () {
      $scope.loading = false;
    };
 
    $scope.checkPasswordLength = function (password) {
      var minPasswordLength = 6;
      return password.length >= minPasswordLength;
    };

    $scope.checkPasswordsMatch = function (password, confirmation) {
      return password === confirmation;
    };
    
    $scope.loading = false;
    $scope.error = '';     // error code can be used, match, min

    $scope.descriptionTypes = DataSvc.descriptionTypes;

  }]);
