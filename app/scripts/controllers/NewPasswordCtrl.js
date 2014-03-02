'use strict';

angular.module('pifarmApp')
.controller('NewPasswordCtrl',
['$scope', '$window',
function ($scope, $window) {
  
  $scope.title = 'Create New Password | Pinaple Farm';
  $window.document.title = $scope.title;

}]);
