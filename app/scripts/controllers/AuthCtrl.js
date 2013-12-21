'use strict';

pinapleApp
  .controller('AuthCtrl', ['$scope', 'serverCurrentYear', function ($scope, serverCurrentYear) {
    
    $scope.currentYear = serverCurrentYear;

  }]);
