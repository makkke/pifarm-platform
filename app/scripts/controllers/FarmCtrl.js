'use strict';

pinapleApp
  .controller('FarmCtrl', ['$scope', '$window', function ($scope, $window) {
    
    $scope.title = 'My Farm | Pinaple';
    $window.document.title = $scope.title;

  }]);
