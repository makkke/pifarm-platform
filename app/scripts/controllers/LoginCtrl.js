'use strict';

pinapleApp
  .controller('LoginCtrl', ['$scope', 'AuthSvc', 'PinapleRepo', function ($scope, AuthSvc, PinapleRepo) {
    
    $scope.login = function(credentials, form) {
      if( form.$valid ) {
        // TODO: add loader
        //$scope.isLoading = true;

        PinapleRepo.getList().then(
          function (pinaples) {
            console.log(pinaples);
          });

        // AuthSvc.login( credentials ).then(
        //   function (user) {
        //     $location.url( 'dashboard' );
        //   },
        //   function (error) {
        //     // TODO: show proper error
        //     console.log( 'Email or password is incorrect.' );
        //   });
      }
    };

  }]);
