'use strict';

pinapleApp
  .factory('AuthSvc', ['$http', '$q', '$cookies', 'Restangular', function ($http, $q, $cookies, Restangular) {

    var Auth = {};

    Auth.signup = function (user) {
      var that = this;
      var deferred = $q.defer();

      $http.post('/_signup', {
        username:     user.username,
        password:     user.password,
        first_name:   user.first_name,
        last_name:    user.last_name,
        company:      user.company,
        description:  user.description
      })
        .success(function (body, status) {
          var sessionToken = body.data.session_token;
          that.setHttpHeaders( sessionToken );
          that.setSessionTokenInBrowser( sessionToken );

          deferred.resolve( body.data );
        })
        .error(function (body, status) {
          deferred.reject( body.error );
        });

      return deferred.promise;
    };

    Auth.setHttpHeaders = function(sessionToken) {
      var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
        'X-Pinaple-Session-Token': sessionToken
      }
      
      Restangular.setDefaultHeaders( headers );
    };

    Auth.setSessionTokenInBrowser = function(sessionToken) {
      $cookies.pinapleSession = sessionToken;
    };

    Auth.isLoggedIn = function () {
      return $cookies.pinapleSession;
    };

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