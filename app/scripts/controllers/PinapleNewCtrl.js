'use strict';

pinapleApp
  .controller('PinapleNewCtrl',
    ['$scope', '$window', '$location', 'DevicesRepoSvc', 'PinaplesRepoSvc',
    function ($scope, $window, $location, DevicesRepoSvc, PinaplesRepoSvc) {
    
    $scope.title = 'Create New Pinaple | Pinaple';
    $window.document.title = $scope.title;

    $scope.loading = false;
    $scope.error = '';

    $scope.pinaple = {};
    
    DevicesRepoSvc.query().then(
      function (devices) {
        $scope.devices = devices;
        $scope.pinaple.device = devices[0].sid;
      },
      function (error, status) {
        console.log( 'error:', error );
      });

    $scope.add_pinaple = function(pinaple, form) {
      if( form.$valid ) {
        $scope.start_spinner();

        PinaplesRepoSvc.create({
          name: pinaple.name,
          description: pinaple.description,
          devices: [pinaple.device]
        }).then(
          function (pinaple) {
            $scope.stop_spinner();
            $location.url( 'farm' );
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

  }]);
