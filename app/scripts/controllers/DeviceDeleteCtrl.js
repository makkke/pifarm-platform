'use strict';

pifarmApp
  .controller('DeviceDeleteCtrl',
  ['$scope', '$window',
  function ($scope, $window) {
    
    $scope.title = 'Delete Device | Pinaple Farm';
    $window.document.title = $scope.title;

  }]);
