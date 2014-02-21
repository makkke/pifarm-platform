'use strict';

angular.module('pifarmApp')
  .controller('DeviceCtrl',
  ['$scope', 'device',
  function ($scope, device) {

    $scope.device = device;

  }]);
