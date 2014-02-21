'use strict';

angular.module('pifarmApp')
.controller('DeviceDeleteCtrl',
['$scope', '$window', '$location', 'device', 'DevicesRepoSvc',
function ($scope, $window, $location, device, DevicesRepo) {
  
  $scope.title = 'Delete Device | Pinaple Farm';
  $window.document.title = $scope.title;

  $scope.device = device;
  $scope.loading = false;
  $scope.button_text = 'Delete Device';

  $scope.confirmed = function() {
    return $scope.confirmation == $scope.device.name;
  };

  $scope.remove = function(device) {
    $scope.start_loading();
    DevicesRepo.remove(device).then(
    function () {
      $scope.stop_loading();
      $location.url( 'devices' );
    },
    function (error, code) {
      $scope.stop_loading();
      console.log(error, code);
    });
  };

  $scope.start_loading = function () {
    $scope.loading = true;
    $scope.button_text = 'Deleting...';
  };

  $scope.stop_loading = function () {
    $scope.loading = false;
    $scope.button_text = 'Delete Device';
  };

}]);
