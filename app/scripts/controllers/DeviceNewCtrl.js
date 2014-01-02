'use strict';

pinapleApp
  .controller('DeviceNewCtrl', ['$scope', '$window', '$location', '$log', 'DataSvc', 'ApiErrorSvc', 'DevicesRepoSvc', function ($scope, $window, $location, $log, DataSvc, ApiErrorSvc, DevicesRepoSvc) {
    
    $scope.title = 'New Device | Pinaple';
    $window.document.title = $scope.title;

    $scope.loading = false;
    $scope.error = '';
    $scope.types = DataSvc.device_types;

    $scope.device = {
      type: $scope.types[0].key
    };

    $scope.add_device = function(device, form) {
      if( form.$valid ) {
        $scope.start_spinner();

        if( !$scope.check_serial_number_format( device.serial_number ) ) {
          $scope.stop_spinner();
          $scope.show_error( 'format' );
          return;
        }

        DevicesRepoSvc.create( device ).then(
          function (device) {
            $scope.stop_spinner();
            $location.url( 'devices' );
          },
          function (error, status) {
            $scope.stop_spinner();
            if( ApiErrorSvc.is_server_error( status ) ) {
              $scope.show_error( 'server' );
              return;
            }

            $log.error( error );
          });
      }
    };

    /*
     * Starts a loading spinner
     * @return bool New spinner status
     */
    $scope.start_spinner = function () {
      return $scope.loading = true;
    };

    /*
     * Stops a loading spinner
     * @return bool New spinner status
     */
    $scope.stop_spinner = function () {
      return $scope.loading = false;
    };

    /*
     * Shows an error near input
     * @param string Error code, possible values 'format', 'server'
     * @return string New error code
     */
    $scope.show_error = function (error_code) {
      return $scope.error = error_code;
    };

    $scope.check_serial_number_format = function( serial_number ) {
      // serial number can be empty since optional
      if( !serial_number ) return true;
      if( serial_number.length > 64 ) return false;

      // alphanumeric with dash(_ or -)
      // no spaces
      var regex = /^[a-z0-9-_]*$/i;
      return regex.test( serial_number );
    };

  }]);
