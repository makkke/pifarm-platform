'use strict';

pinapleApp
  .controller('ForgotCtrl', ['$scope', function ($scope) {
    
    $scope.title = 'Forgot Password? | Pinaple';
    $window.document.title = $scope.title;

  }]);
