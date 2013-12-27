'use strict';

pinapleApp
  .controller('LoginCtrl', ['$scope', 'AuthSvc', 'ApiErrorSvc', function ($scope, AuthSvc, ApiErrorSvc) {

    $scope.loading = false;
    $scope.error = '';
    
    /*
     * Logs user in
     * @param object Credentials
     * @param object Form
     */
    $scope.login = function(credentials, form) {
      if( form.$valid ) {
        $scope.startSpinner();

        if( !$scope.checkPasswordLength( credentials.password ) ) {
          $scope.stopSpinner();
          $scope.showError( 'invalid' );
          return;
        }

        AuthSvc.login( credentials ).then(
          function (account) {
            $scope.stopSpinner();
            $location.url( 'dashboard' );
          },
          function (error, status) {
            $scope.stopSpinner();
            if( ApiErrorSvc.isServerError( status ) ) {
              if( error.code === ApiErrorSvc.AccountInvalidCredentials ) {
                $scope.showError( 'invalid' );
                return;
              }
            }
            else {
              $scope.showError( 'server' );
            }
          });
      }
    };

    /*
     * Starts a loading spinner
     * @return bool New spinner status
     */
    $scope.startSpinner = function () {
      return $scope.loading = true;
    };

    /*
     * Stops a loading spinner
     * @return bool New spinner status
     */
    $scope.stopSpinner = function () {
      return $scope.loading = false;
    };

    /*
     * Shows an error near input
     * @param string Error code, possible values 'used' || 'match' || 'min'
     * @return string New error code
     */
    $scope.showError = function (errorCode) {
      return $scope.error = errorCode;
    };
  
    /*
     * Checks if password is longer than minimum length
     * @param string Password
     * @return bool
     */
    $scope.checkPasswordLength = function (password) {
      var minPasswordLength = 6;
      if( !password ) return false;
      return password.length >= minPasswordLength;
    };

  }]);
