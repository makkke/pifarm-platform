'use strict';

angular.module('pifarmApp')
.controller('NewPasswordCtrl',
['$scope',
function ($scope) {
  
  $scope.title = 'Create New Password | Pinaple Farm';
  $window.document.title = $scope.title;

}]);
