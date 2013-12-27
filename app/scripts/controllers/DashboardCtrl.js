'use strict';

pinapleApp
  .controller('DashboardCtrl', ['$scope', 'AuthSvc', function ($scope, AuthSvc) {
    
    console.log(AuthSvc.account);

  }]);
