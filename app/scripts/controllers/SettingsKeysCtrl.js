'use strict';

pinapleApp
  .controller('SettingsKeysCtrl', ['$scope', '$window', function ($scope, $window) {

    $scope.title = 'Access Keys | Pinaple';
    $window.document.title = $scope.title;
    
  }]);
