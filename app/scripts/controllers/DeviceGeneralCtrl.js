'use strict';

pifarmApp
  .controller('DeviceGeneralCtrl',
  ['$scope', '$window',
  function ($scope, $window) {
    
    $scope.title = 'Device General| Pinaple Farm';
    $window.document.title = $scope.title;

  }]);
