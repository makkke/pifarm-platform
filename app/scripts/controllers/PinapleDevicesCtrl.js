'use strict';

angular.module('pifarmApp')
.controller('PinapleDevicesCtrl',
['$scope', 'DevicesRepoSvc', 'pinaple',
function ($scope, DevicesRepo, pinaple) {

  $scope.pinaple = pinaple;
  
  DevicesRepo.all().then(
  function (devices) {
    $scope.devices = devices;
  },
  function (error) {
    console.log(error);
  });

  $scope.pinaple_devices = function (devices, pinaple) {
    var pinaple_devices = [];
    _.each(pinaple.devices, function (device_id) {
      var device = _.find( devices, { id: device_id } );
      pinaple_devices.push( device );
    });

    return pinaple_devices;
  };

  $scope.show_remove = function (device) {

  };

}]);
