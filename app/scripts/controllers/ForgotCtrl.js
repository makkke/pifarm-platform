'use strict';

angular.module('pifarmApp')
  .controller('ForgotCtrl',
  ['$scope',
  function ($scope) {
    
    $scope.title = 'Forgot Password? | Pinaple Farm';
    $window.document.title = $scope.title;

  }]);
