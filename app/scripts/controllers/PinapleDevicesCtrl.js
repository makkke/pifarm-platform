'use strict';

angular.module('pifarmApp')
.controller('PinapleDevicesCtrl',
['$scope', 'DevicesRepoSvc', 'PinaplesRepoSvc', 'pinaple',
function ($scope, DevicesRepo, PinaplesRepo, pinaple) {

  $scope.pinaple = pinaple;
  
  DevicesRepo.all().then(
  function (devices) {
    $scope.devices = devices;
  },
  function (error) {
    console.log(error);
  });

  $scope.$watch('selected_device', function (new_value, old_value) {
    if( new_value ) {
      if( ! _.contains(pinaple.devices, new_value) ) {
        pinaple.devices.push(new_value);
        $scope.selected_device = null;

        PinaplesRepo.add_device( pinaple, new_value ).then(
        function (device) {

        },
        function (error) {
          console.log(error);
        });
      }
    }
  });

  $scope.pinaple_devices = function (devices, pinaple) {
    if( ! devices || ! pinaple ) return [];

    var pinaple_devices = [];
    _.each(pinaple.devices, function (device_id) {
      var device = _.find( devices, { id: device_id } );
      pinaple_devices.push( device );
    });

    return pinaple_devices;
  };

  $scope.remove = function (device, pinaple) {
    _.remove(pinaple.devices, function (value) {
      return value == device.id;
    });

    PinaplesRepo.remove_device( pinaple, device.id ).then(
    function (device) {

    },
    function (error) {
      console.log(error);
    });
  };

  $scope.available = function (pinaple_devices) {
    return function (device) {
      return ! _.contains(pinaple_devices, device.id);
    };
  };

}]);
