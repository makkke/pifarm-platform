'use strict';

angular.module('pifarmApp')
  .controller('SettingsProfileCtrl',
  ['$scope', '$window',
  function ($scope, $window) {

    $scope.title = 'Profile Settings | Pinaple Farm';
    $window.document.title = $scope.title;
    
  }]);
