'use strict';

angular.module('pifarmApp')
.controller('SliceGeneralCtrl',
['$scope', '$stateParams', '$location', 'AccountValidatorSvc', 'AccountsRepoSvc', 'SlicesRepoSvc', 'DataSvc', 'slice',
function ($scope, $stateParams, $location, AccountValidator, AccountsRepo, SlicesRepo, DataSvc, slice) {
  
  $scope.slice = slice;
  console.log(slice);

  $scope.loading = false;
  $scope.error = false;

  $scope.types = DataSvc.slice_types;

  $scope.$watch('slice.type', function (new_value) {
    if( new_value ) {
      $scope.load_units( new_value );
    }
  });

  $scope.update = function(form, slice) {
    $scope.error = '';
    
    if( form.$valid ) {
      $scope.loading = true;

      SlicesRepo.update( slice ).then(
      function (slice) {
        $scope.loading = false;
      },
      function (error) {
        $scope.loading = false;

        console.log(error);
      });
    }
  };

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

  $scope.load_units = function (key) {
    var type = _.find( $scope.types, { key: key } );
    if( type ) {
      $scope.units = type.units;
      $scope.slice.unit = type.units[0].key;
    }
  };

}]);
