'use strict';

pinapleApp
  .controller('DeviceDeleteCtrl', ['$scope', '$window', function ($scope, $window) {
    
    $scope.title = 'Delete Device | Pinaple';
    $window.document.title = $scope.title;

  }]);
