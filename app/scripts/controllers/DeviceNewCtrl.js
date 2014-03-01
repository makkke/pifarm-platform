'use strict';

angular.module('pifarmApp')
.controller('DeviceNewCtrl',
['$scope', '$window', '$location', '$log', 'DataSvc', 'ApiErrorSvc', 'DevicesRepoSvc', 'DeviceValidatorSvc',
function ($scope, $window, $location, $log, DataSvc, ApiErrorSvc, DevicesRepoSvc, DeviceValidator) {
  
  $scope.title = 'Add a New Device | Pinaple Farm';
  $window.document.title = $scope.title;

  $scope.loading = false;
  $scope.error = '';
  $scope.types = DataSvc.device_types;

  $scope.device = {
    type: $scope.types[0].key
  };

  $scope.create = function(device, form) {
    if( form.$valid ) {
      $scope.loading = true;
      $scope.error = '';

      if( !DeviceValidator.check_serial_number_format( device.serial_number ) ) {
        $scope.loading = false;
        $scope.show_error( 'format' );
        return;
      }

      DevicesRepoSvc.create( device ).then(
        function (device) {
          $scope.loading = false;
          $location.url( 'devices' );
        },
        function (error, status) {
          $scope.loading = false;

          $scope.show_error( 'server' );
        });
    }
  };

  /*
   * Shows an error near input
   * @param string Error code, possible values 'format', 'server'
   * @return string New error code
   */
  $scope.show_error = function (error_code) {
    return $scope.error = error_code;
  };

}]);
