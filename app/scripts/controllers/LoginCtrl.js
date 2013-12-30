'use strict';

pinapleApp
  .controller('LoginCtrl', ['$scope', '$window', '$location', '$log', '$stateParams', 'MIN_PASSWORD_LENGTH', 'AuthSvc', 'ApiErrorSvc', function ($scope, $window, $location, $log, $stateParams, MIN_PASSWORD_LENGTH, AuthSvc, ApiErrorSvc) {

    $scope.loading = false;
    $scope.error = '';
    $scope.credentials = {
      username: $stateParams.username || ''
    };

    $scope.title = 'Log In | Pinaple';
    $window.document.title = $scope.title;
    
    /*
     * Logs user in
     * @param object Credentials
     * @param object Form
     */
    $scope.login = function(credentials, form) {
      if( form.$valid ) {
        $scope.start_spinner();

        if( !$scope.check_password_length( credentials.password ) ) {
          $scope.stop_spinner();
          $scope.show_error( 'invalid' );
          return;
        }

        AuthSvc.login( credentials ).then(
          function (account) {
            $scope.stop_spinner();
            $location.url( 'farm' );
          },
          function (error, status) {
            $scope.stop_spinner();
            if( ApiErrorSvc.is_server_error( status ) ) {
              $scope.show_error( 'server' );
              return;
            }
            
            if( error.code === ApiErrorSvc.AccountInvalidCredentials ) {
              $scope.show_error( 'invalid' );
              return;
            }

            $log.error( error );
          });
      }
    };

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
     * @param string Error code, possible values 'used' || 'match' || 'min'
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

  }]);
