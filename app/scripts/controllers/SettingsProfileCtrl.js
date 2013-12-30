'use strict';

pinapleApp
  .controller('SettingsProfileCtrl', ['$scope', '$window', function ($scope, $window) {

    $scope.title = 'Profile Settings | Pinaple';
    $window.document.title = $scope.title;
    
  }]);
