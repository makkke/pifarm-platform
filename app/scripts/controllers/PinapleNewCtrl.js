'use strict';

angular.module('pifarmApp')
.controller('PinapleNewCtrl',
['$scope', '$window', '$location', 'DevicesRepoSvc', 'PinaplesRepoSvc', 'ApiErrorSvc',
function ($scope, $window, $location, DevicesRepoSvc, PinaplesRepoSvc, ApiErrorSvc) {
  
  $scope.title = 'Create a New Pinaple | Pinaple Farm';
  $window.document.title = $scope.title;

  $scope.loading = false;
  $scope.error = '';

  $scope.pinaple = {};
  
  DevicesRepoSvc.query().then(
    function (devices) {
      $scope.devices = devices;
      $scope.pinaple.device = devices[0].id;
    },
    function (error, status) {
      console.log( 'error:', error );
    });

  $scope.add_pinaple = function(pinaple, form) {
    if( form.$valid ) {
      $scope.loading = true;

      PinaplesRepoSvc.create({
        name: pinaple.name,
        description: pinaple.description,
        devices: [pinaple.device]
      }).then(
      function (pinaple) {
        $scope.loading = false;
        $location.url( 'pinaples' );
      },
      function (error, status) {
        $scope.loading = false;
        if( ApiErrorSvc.server_error( status ) ) {
          $scope.show_error( 'server' );
        }
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
