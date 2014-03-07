'use strict';

angular.module('pifarmApp')
.controller('DeviceGeneralCtrl',
['$scope', '$location', 'DevicesRepoSvc', 'DeviceValidatorSvc', 'DataSvc', 'ApiErrorSvc', 'device',
function ($scope, $location, DevicesRepo, DeviceValidator, Data, ApiErrorSvc, device) {
  
  $scope.device = device;
  $scope.loading = false;

  $scope.error = '';
  $scope.types = Data.device_types;

  $scope.update = function(form, device) {
    $scope.error = '';
    
    if( form.$valid ) {
      $scope.loading = true;

      if( ! DeviceValidator.check_serial_number_format( device.serial_number ) ) {
        $scope.loading = false;
        $scope.show_error( 'format' );
        return;
      }

      DevicesRepo.update( device ).then(
      function (device) {
        $scope.loading = false;
      },
      function (error) {
        $scope.loading = false;
        
        console.log(error);
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
