'use strict';

pinapleApp
  .controller('NavCtrl', ['$scope', '$location', 'AuthSvc', function ($scope, $location, AuthSvc) {

    $scope.get_user_fullname = function () {
      return AuthSvc.account.first_name + ' ' + AuthSvc.account.last_name;
    };

    $scope.logout = function () {
      AuthSvc.logout();
      $location.url( 'login' );
    };

  }]);
