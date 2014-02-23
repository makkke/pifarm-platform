'use strict';

angular.module('pifarmApp')
.controller('SettingsCtrl',
['$scope', '$window', 'account',
function ($scope, $window, account) {

  $scope.title = 'Your Account | Pinaple Farm';
  $window.document.title = $scope.title;
  
  $scope.account = account;
  
}]);
