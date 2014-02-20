'use strict';

angular.module('pifarmApp')
  .controller('PinapleCtrl',
  ['$scope', 'pinaple',
  function ($scope, pinaple) {
    
    $scope.pinaple = pinaple;

  }]);
