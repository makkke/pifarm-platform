'use strict';

pinapleApp
  .controller('SettingsDeleteAccountCtrl', ['$scope', '$window', function ($scope, $window) {

    $scope.title = 'Delete Account | Pinaple';
    $window.document.title = $scope.title;
    
  }]);
