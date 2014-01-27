'use strict';

pinapleApp
  .controller('PinapleCtrl',
  ['$scope', '$stateParams', 'pinaple',
  function ($scope, $stateParams, pinaple) {
    
    $scope.pinaple = pinaple;

  }]);
