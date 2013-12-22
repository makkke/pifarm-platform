'use strict';

pinapleApp
  .factory('AuthSvc', ['$http', '$q', 'Restangular', function ($http, $q, Restangular) {

    var Auth = {};

    Auth.signup = function (user) {
      
    };

    Auth.setHttpHeaders = function(apiKey, authToken) {
      var secretBase64 = btoa( apiKey + ':' + authToken );
      this.defaultHeaders = {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Basic ' + secretBase64
      }
      
      Restangular.setDefaultHeaders( this.defaultHeaders );
    }

    Auth.login = function(credentials) {
      var deferred = $q.defer();

      $http({
        method: 'GET',
        url: '/login',
        data: {
          username: credentials.username,
          password: credentials.password
        }
      })
      .success(function (response) {
        console.log('good');
        deferred.resolve();
        // // if authentication is ok then
        // // login to app
        // Auth.login( response.sid, response.auth_token ).then(
        //   function(credentials) {
        //     $location.url( 'dashboard' );
        //   },
        //   function(error) {
        //     $scope.showError( 'Can not retrieve credentials information. Please try again.', error );
        //   });
      })
      .error(function (error) {
        console.log('bad');
        deferred.reject();
      });

      return deferred.promise;
    }

    // logs user in by retrieving user info by session and setting hppt headers
    // Auth.login = function(apiKey, authToken) {
    //   var self = this;
    //   var deferred = $q.defer();

    //   this.setHttpHeaders( apiKey, authToken );
    //   this.user = User.me();
    //   this.user.then(
    //     function (user) {
    //       self.loggedIn = true;
    //       self.currentUser = user;
    //       deferred.resolve( user );
    //     },
    //     function (response) {
    //       NotifierSvc.show( 'Could not retrieve user', response );
    //       deferred.reject( response );
    //     });

    //   return deferred.promise;
    // };

    // Auth.isAdmin = function(user) {
    //   return _.contains( this.user.roles, 'Admin' );
    // };

    return Auth;

  }]);