'use strict';

pinapleApp
  .controller('DevicesCtrl', ['$scope', '$window', 'DevicesRepoSvc', 'DataSvc', function ($scope, $window, DevicesRepoSvc, DataSvc) {

    $scope.title = 'Devices | Pinaple';
    $window.document.title = $scope.title;

    $scope.types = DataSvc.device_types;
    
    DevicesRepoSvc.query().then(
      function (devices) {
        $scope.devices = devices;
        console.log( devices );
      },
      function (error, status) {
        console.log( 'error:', error );
      });

  }]);