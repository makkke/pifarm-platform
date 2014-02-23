'use strict';

angular.module('pifarmApp')
.controller('SettingsAccountCtrl',
['$scope', 'AccountValidatorSvc',
function ($scope, AccountValidator) {

  $scope.loading = false;
  $scope.error = '';

  $scope.update = function (form, password) {
    if( form.$valid ) {
      $scope.laoding = true;
      $scope.error = '';

      if( ! AccountValidator.check_password_length(password.old) ) {
        $scope.loading = false;
        $scope.show_error( 'incorrect' );
        return;
      }

      if( ! AccountValidator.check_password_length(password.new) ) {
        $scope.loading = false;
        $scope.show_error( 'min' );
        return;
      }
    }
  }; 
  
}]);
