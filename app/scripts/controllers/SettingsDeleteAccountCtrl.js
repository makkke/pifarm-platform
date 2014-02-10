'use strict';

pifarmApp
  .controller('SettingsDeleteAccountCtrl',
  ['$scope', '$window',
  function ($scope, $window) {

    $scope.title = 'Delete Account | Pinaple Farm';
    $window.document.title = $scope.title;
    
  }]);
