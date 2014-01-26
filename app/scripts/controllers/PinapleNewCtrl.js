'use strict';

pinapleApp
  .controller('PinapleNewCtrl',
    ['$scope', '$window', '$location', 'DevicesRepoSvc', 'PinaplesRepoSvc',
    function ($scope, $window, $location, DevicesRepoSvc, PinaplesRepoSvc) {
    
    $scope.title = 'Create New Pinaple | Pinaple';
    $window.document.title = $scope.title;

    $scope.loading = false;
    $scope.button_text = 'Create Pinaple';
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
        $scope.start_creating();

        PinaplesRepoSvc.create({
          name: pinaple.name,
          description: pinaple.description,
          devices: [pinaple.device]
        }).then(
          function (pinaple) {
            $scope.stop_creating();
            $location.url( 'farm' );
          },
          function (error, status) {
            $scope.stop_creating();
            if( ApiErrorSvc.is_server_error( status ) ) {
              $scope.show_error( 'server' );
              return;
            }

            $log.error( error );
          });
      }
    };

    $scope.start_creating = function () {
      $scope.button_text = 'Creating Pinaple...';
      return $scope.loading = true;
    };

    $scope.stop_creating = function () {
      return $scope.button_text = 'Create Pinaple';
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
