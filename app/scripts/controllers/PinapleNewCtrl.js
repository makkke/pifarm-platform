'use strict';

pinapleApp
  .controller('PinapleNewCtrl', ['$scope', '$window', function ($scope, $window) {
    
    $scope.title = 'New Pinaple | Pinaple';
    $window.document.title = $scope.title;

  }]);
