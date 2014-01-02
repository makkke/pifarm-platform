'use strict';

pinapleApp
  .controller('SignupCtrl', ['$scope', '$window', '$location', '$log', 'MIN_PASSWORD_LENGTH', 'AuthSvc', 'DataSvc', 'ApiErrorSvc',
    function ($scope, $window, $location, $log, MIN_PASSWORD_LENGTH, AuthSvc, DataSvc, ApiErrorSvc) {

    $scope.title = 'Sign Up | Pinaple';
    $window.document.title = $scope.title;
    
    $scope.loading = false;
    $scope.error = '';
    $scope.description_types = DataSvc.description_types;

    /*
     * Creates a new user and redirects to login page
     * @param object User
     * @param object Form
     */
    $scope.signup = function (user, form) {
      if( form.$valid ) {
        $scope.start_spinner();
        
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

    /*
     * Starts a loading spinner
     * @return bool New spinner status
     */
    $scope.start_spinner = function () {
      return $scope.loading = true;
    };

    /*
     * Stops a loading spinner
     * @return bool New spinner status
     */
    $scope.stop_spinner = function () {
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
      return password.length >= MIN_PASSWORD_LENGTH;
    };

    /*
     * Checks if password matches password confirmation.
     * @param string Password
     * @param string Password confirmation
     * @return bool
     */
    $scope.check_passwords_match = function (password, confirmation) {
      return password === confirmation;
    };

  }]);
