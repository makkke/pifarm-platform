'use strict';

angular.module('pifarmApp')
.controller('ConfirmCtrl',
['$scope', '$window', 'confirmation',
function ($scope, $window, confirmation) {
  
  $scope.title = 'Confirm Your Account | Pinaple Farm';
  $window.document.title = $scope.title;

  $scope.confirmation = confirmation;

}]);
