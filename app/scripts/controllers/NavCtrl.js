'use strict';

pinapleApp
  .controller('NavCtrl', ['$scope', '$timeout', 'AuthSvc', function ($scope, $timeout, AuthSvc) {
    
    $scope.user = AuthSvc.account || 'Sponge Bob';

  }]);
