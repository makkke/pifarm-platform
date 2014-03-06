'use strict';

angular.module('pifarmApp')
.controller('SliceGeneralCtrl',
['$scope', '$stateParams', '$location', 'AccountValidatorSvc', 'AccountsRepoSvc', 'SlicesRepoSvc', 'slice',
function ($scope, $stateParams, $location, AccountValidator, AccountsRepo, SlicesRepo, slice) {
  
  $scope.slice = slice;
  $scope.loading = false;
  $scope.error = false;

  $scope.remove = function(form, password, slice) {
    if( form.$valid ) {
      $scope.loading = true;
      $scope.error = false;

      if( ! AccountValidator.check_password_length(password) ) {
        $scope.loading = false;
        $scope.error = true;
        return;
      }

      AccountsRepo.check_password(password).then(
      function () {
        SlicesRepo.remove(slice).then(
        function () {
          $scope.loading = false;
          debugger;
          $location.url( 'pinaples/' + $stateParams.pinaple_id + '/slices' );
        },
        function (error) {
          $scope.loading = false;
          $scope.error = true;
        });
      },
      function (error) {
        $scope.loading = false;
        $scope.error = true;
      });
    }
  };

}]);
