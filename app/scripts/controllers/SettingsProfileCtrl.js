'use strict';

angular.module('pifarmApp')
.controller('SettingsProfileCtrl',
['$scope', '$window', 'AccountsRepoSvc', 'account',
function ($scope, $window, AccountsRepo, account) {

  $scope.account = account;
  $scope.loading = false;

  $scope.update = function (form, account) {
    if( form.$valid ) {
      $scope.loading = true;

      AccountsRepo.update(account).then(
      function (account) {
        $scope.loading = false;        
      },
      function (error, code) {
        $scope.loading = false;
      });
    }
  };
  
}]);
