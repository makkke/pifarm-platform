'use strict';

angular.module('pifarmApp')
  .controller('LoginCtrl',
  ['$scope', '$window', '$location', '$stateParams', 'AuthSvc', 'ApiErrorSvc', 'AccountValidatorSvc',
  function ($scope, $window, $location, $stateParams, AuthSvc, ApiErrorSvc, AccountValidator) {

    $scope.title = 'Log In | Pinaple Farm';
    $window.document.title = $scope.title;

    $scope.loading = false;
    $scope.error = '';
    $scope.credentials = {
      username: $stateParams.username || ''
    };

    
    /*
     * Logs user in
     * @param object credentials
     * @param object form
     */
    $scope.login = function(credentials, form) {
      if( form.$valid ) {
        $scope.loading = true;
        $scope.error = '';

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
        function (error) {
          $scope.loading = false;

          if( ApiErrorSvc.unauthorized(error) ) {
            $scope.show_error( 'invalid' );
          }
          else {
            $scope.show_error( 'server' );
          }
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
