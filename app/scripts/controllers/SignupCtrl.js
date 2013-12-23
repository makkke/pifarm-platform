'use strict';

pinapleApp
  .controller('SignupCtrl', ['$scope', '$window', '$location', 'AuthSvc', 'DataSvc', 'ApiErrorSvc', function ($scope, $window, $location, AuthSvc, DataSvc, ApiErrorSvc) {

    $scope.user = {};
    $scope.user.username = 'slava@gmail.com';
    $scope.user.password = '123456';
    $scope.user.password_confirmation = '123456';
    $scope.user.first_name = 'Slava';
    $scope.user.last_name = 'Ivanov';
    $scope.user.company = 'Exilium';
    $scope.user.description = 'pi-oneer';
    $scope.user.agreed = true;

    /*
     * Creates a new user and logs him in
     * @param object User
     * @param object Form
     */
    $scope.signup = function (user, form) {
      if( form.$valid ) {
        $scope.startSpinner();
        
        if( !$scope.checkPasswordLength( user.password ) ) {
          $scope.stopSpinner();
          $scope.showError( 'min' );
          return;
        }

        if( !$scope.checkPasswordsMatch( user.password, user.password_confirmation ) ) {
          $scope.stopSpinner();
          $scope.showError( 'match' );
          return;
        }

        AuthSvc.signup( user ).then(
          function (account) {
            $scope.stopSpinner();
            $location.url( 'dashboard' );
          },
          function (error) {
            $scope.stopSpinner();
            if( error.code === ApiErrorSvc.AccountAlreadyExists ) {
              $scope.showError( 'used' );
            }
          });
      }
    }

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

    /*
     * Checks if password matches password confirmation.
     * @param string Password
     * @param string Password confirmation
     * @return bool
     */
    $scope.checkPasswordsMatch = function (password, confirmation) {
      return password === confirmation;
    };
    
    $scope.loading = false;

    $scope.descriptionTypes = DataSvc.descriptionTypes;

    $scope.title = 'Sign Up | Pinaple';
    $window.document.title = $scope.title;

  }]);
