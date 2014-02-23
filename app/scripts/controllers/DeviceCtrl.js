'use strict';

angular.module('pifarmApp')
.controller('DeviceCtrl',
['$scope', '$window', 'device',
function ($scope, $window, device) {

  $scope.title = 'Edit Your Device | Pinaple Farm';
  $window.document.title = $scope.title;
  
  $scope.device = device;

}]);
