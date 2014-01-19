'use strict';

pinapleApp
  .controller('DevicesCtrl', ['$scope', '$window', 'DevicesRepoSvc', 'DataSvc', function ($scope, $window, DevicesRepoSvc, DataSvc) {

    $scope.title = 'Devices | Pinaple';
    $window.document.title = $scope.title;

    $scope.types = DataSvc.device_types;
    
    DevicesRepoSvc.query().then(
      function (devices) {
        _.each(devices, function (device) {
          device.copy_text = 'copy';
        });
        $scope.devices = devices;
      },
      function (error, status) {
        console.log( 'error:', error );
      });

    $scope.change_text = function (device) {
      device.copy_text = 'copied';
    };

  }]);