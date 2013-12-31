'use strict';

pinapleApp
  .controller('DeviceGeneralCtrl', ['$scope', '$window', function ($scope, $window) {
    
    $scope.title = 'Device General Info | Pinaple';
    $window.document.title = $scope.title;

  }]);
