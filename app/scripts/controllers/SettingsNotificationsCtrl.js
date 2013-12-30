'use strict';

pinapleApp
  .controller('SettingsNotificationsCtrl', ['$scope', '$window', function ($scope, $window) {

    $scope.title = 'Notifications | Pinaple';
    $window.document.title = $scope.title;
    
  }]);
