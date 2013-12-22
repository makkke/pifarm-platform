'use strict';

pinapleApp
  .controller('SignupCtrl', ['$scope', '$window', 'AuthSvc', 'DataSvc', function ($scope, $window, AuthSvc, DataSvc) {

    $scope.user = {};
    $scope.user.email = 'slava@gmail.com';
    $scope.user.password = '123456';
    $scope.user.passwordConfirmation = '123456';
    $scope.user.firstName = 'Slava';
    $scope.user.lastName = 'Ivanov';
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

        if( !$scope.checkPasswordsMatch( user.password, user.passwordConfirmation ) ) {
          $scope.stopSpinner();
          $scope.showError( 'match' );
          return;
        }

        AuthSvc.signup({
          username:     user.email,
          password:     user.password,
          firstName:    user.firstName,
          lastName:     user.lastName,
          company:      user.company,
          description:  user.description 
        }).then(
          function (user) {
            $scope.stopSpinner();
            console.log('user:', user);
          },
          function (error) {
            $scope.stopSpinner();
            console.log('error:', error);
          });

        // do sign up to server
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
