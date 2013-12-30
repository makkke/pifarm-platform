'use strict';

pinapleApp
  .controller('SettingsAccountCtrl', ['$scope', '$window', function ($scope, $window) {

    $scope.title = 'Account Settings | Pinaple';
    $window.document.title = $scope.title;
    
  }]);
