'use strict';

pifarmApp
  .controller('AuthCtrl',
  ['$scope', 'ServerCurrentYear',
  function ($scope, ServerCurrentYear) {
    
    $scope.current_year = ServerCurrentYear;

  }]);
