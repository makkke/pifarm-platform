'use strict';

angular.module('pifarmApp')
  .controller('PinapleCtrl',
  ['$scope', '$window', 'pinaple',
  function ($scope, $window, pinaple) {
    
    $scope.title = 'Edit Your Pinaple | Pinaple Farm';
    $window.document.title = $scope.title;

    $scope.pinaple = pinaple;

  }]);
