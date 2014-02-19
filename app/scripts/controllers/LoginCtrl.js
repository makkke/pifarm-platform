'use strict';

angular.module('pifarmApp')
  .controller('LoginCtrl',
  ['$scope', '$window', '$location', '$stateParams', 'AuthSvc', 'ApiErrorSvc', 'AccountValidatorSvc',
  function ($scope, $window, $location, $stateParams, AuthSvc, ApiErrorSvc, AccountValidator) {

    $scope.loading = false;
    $scope.error = '';
    $scope.credentials = {
      username: $stateParams.username || ''
    };

    $scope.title = 'Log In | Pinaple Farm';
    $window.document.title = $scope.title;
    
    /*
     * Logs user in
     * @param object credentials
     * @param object form
     */
    $scope.login = function(credentials, form) {
      if( form.$valid ) {
        $scope.loading = true;

        if( ! AccountValidator.check_password_length(credentials.password) ) {
          $scope.loading = false;
          $scope.show_error( 'invalid' );
          return;
        }

        AuthSvc.login( credentials ).then(
          function (account) {
            $scope.loading = false;
            $location.url( 'pinaples' );
          },
          function (error, status) {
            $scope.loading = false;
            if( ApiErrorSvc.server_error(status) ) {
              $scope.show_error( 'server' );
              return;
            }
            
            $scope.show_error( 'invalid' );
          });
      }
    };

    /*
     * Shows an error near input
     * @param string Error code, possible values 'used' || 'match' || 'min'
     * @return string New error code
     */
    $scope.show_error = function (error_code) {
      return $scope.error = error_code;
    };

  }]);
