'use strict';

angular.module('pifarmApp')
  .controller('SettingsAccountCtrl',
  ['$scope', '$window',
  function ($scope, $window) {

    $scope.title = 'Account Settings | Pinaple Farm';
    $window.document.title = $scope.title;
    
  }]);
