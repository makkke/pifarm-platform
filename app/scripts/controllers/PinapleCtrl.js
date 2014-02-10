'use strict';

pifarmApp
  .controller('PinapleCtrl',
  ['$scope', 'pinaple',
  function ($scope, pinaple) {
    
    $scope.pinaple = pinaple;

  }]);
