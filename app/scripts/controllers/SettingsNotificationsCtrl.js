'use strict';

angular.module('pifarmApp')
  .controller('SettingsNotificationsCtrl',
  ['$scope', '$window',
  function ($scope, $window) {

    $scope.title = 'Notifications | Pinaple Farm';
    $window.document.title = $scope.title;
    
  }]);
