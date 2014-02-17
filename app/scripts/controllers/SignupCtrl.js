'use strict';

pifarmApp
  .controller('SignupCtrl',
  ['$scope', '$window', '$location', '$log', '$timeout', 'Constants', 'AuthSvc', 'DataSvc', 'ApiErrorSvc',
  function ($scope, $window, $location, $log, $timeout, Constants, AuthSvc, DataSvc, ApiErrorSvc) {

    $scope.title = 'Sign Up | Pinaple Farm';
    $window.document.title = $scope.title;
    
    //$scope.loading = false;
    $scope.button_text = 'Sign Up';
    $scope.error = '';
    $scope.creating = false;

    $scope.poop = function () {
      $scope.creating = true;
      $timeout(function(){
        $scope.creating = false;
        console.log('got it');
      }, 2000);
    };

    /*
     * Create new user and redirect to login page
     * @param object User
     * @param object Form
     */
    $scope.signup = function (user, form) {
      if( true ) {
        $scope.start_creating();
        
        if( !$scope.check_password_length( user.password ) ) {
          $scope.stop_spinner();
          $scope.show_error( 'min' );
          return;
        }

        if( !$scope.check_passwords_match( user.password, user.password_confirmation ) ) {
          $scope.stop_spinner();
          $scope.show_error( 'match' );
          return;
        }

        AuthSvc.signup( user ).then(
          function (account) {
            $scope.stop_spinner();
            $location.url( 'login?username=' + account.username );
          },
          function (error, status) {
            $scope.stop_spinner();
            if( ApiErrorSvc.is_server_error( status ) ) {
              $scope.show_error( 'server' );
              return;
            }
            
            if( error.code === ApiErrorSvc.AccountAlreadyExists ) {
              $scope.show_error( 'used' );
            }

            $log.error( error );
          });
      }
    }

    $scope.start_creating = function () {
      $scope.button_text = 'Creating your Account...';
      return $scope.loading = true;
    };

    $scope.stop_creating = function () {
      $scope.button_text = 'Sign Up';
      return $scope.loading = false;
    };

    /*
     * Shows an error near input
     * @param string Error code, possible values 'used' || 'match' || 'min' || 'server'
     * @return string New error code
     */
    $scope.show_error = function (error_code) {
      return $scope.error = error_code;
    };
  
    /*
     * Checks if password is longer than minimum length
     * @param string Password
     * @return bool
     */
    $scope.check_password_length = function (password) {
      if( !password ) return false;
      return password.length >= Constants.min_password_length;
    };

  }]);
