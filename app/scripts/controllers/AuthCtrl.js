'use strict';

pinapleApp
  .controller('AuthCtrl', ['$scope', 'ServerCurrentYear', function ($scope, ServerCurrentYear) {
    
    $scope.current_year = ServerCurrentYear;

  }]);
