'use strict';

angular.module('pifarmApp')
.controller('SliceCtrl',
['$scope', '$window', 'slice',
function ($scope, $window, slice) {
  
  $scope.title = 'Edit Your Slice | Pinaple Farm';
  $window.document.title = $scope.title;

  $scope.slice = slice;

}]);
