'use strict';

angular.module('pifarmApp')
  .controller('SignupCtrl',
  ['$scope', '$window', '$location', 'AuthSvc', 'ApiErrorSvc', 'AccountValidatorSvc',
  function ($scope, $window, $location, AuthSvc, ApiErrorSvc, AccountValidator) {

    $scope.title = 'Sign Up | Pinaple Farm';
    $window.document.title = $scope.title;
    
    $scope.loading = false;
    $scope.error = '';

    /*
     * Create new account and redirect to login page
     * @param object account
     * @param object form
     */
    $scope.signup = function (account, form) {
      if( form.$valid ) {
        $scope.loading = true;
        $scope.error = '';
        
        if( ! AccountValidator.check_password_length(account.password) ) {
          $scope.loading = false;
          $scope.show_error( 'min' );
          return;
        }

        AuthSvc.signup( account ).then(
          function (account) {
            $scope.loading = false;
            $location.url( 'login?username=' + account.username );
          },
          function (error) {
            $scope.loading = false;
            
            if( ApiErrorSvc.server_error( status ) ) {
              $scope.show_error( 'server' );
              return;
            }
            
            if( _.contains(error.errors, 'The email has already been taken.' ) ) {
              $scope.show_error( 'used' );
            }
          });
      }
    }

    /*
     * Shows an error near input
     * @param string Error code, possible values 'used' || 'min' || 'server'
     * @return string New error code
     */
    $scope.show_error = function (error_code) {
      return $scope.error = error_code;
    };

  }]);
