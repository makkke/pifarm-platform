'use strict';

pinapleApp
  .controller('MainCtrl', ['$scope', 'ServerCurrentYear', function ($scope, ServerCurrentYear) {

    $scope.current_year = ServerCurrentYear;
    
  }]);
