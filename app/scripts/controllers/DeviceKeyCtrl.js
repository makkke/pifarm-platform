'use strict';

angular.module('pifarmApp')
.controller('DeviceKeyCtrl',
['$scope', 'DevicesRepoSvc', 'device',
function ($scope, DevicesRepo, device) {
  
  $scope.device = device;

  $scope.regenerate = function (device) {
    device.regenerate_key().then(
    function (device) {
      $scope.device.key = device.key;
    },
    function (error, code) {

    });
  };

}]);
