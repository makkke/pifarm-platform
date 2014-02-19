'use strict';

angular.module('pifarmApp')
  .controller('SettingsKeysCtrl',
  ['$scope', '$window',
  function ($scope, $window) {

    $scope.title = 'Access Keys | Pinaple Farm';
    $window.document.title = $scope.title;
    
  }]);
