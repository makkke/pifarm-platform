'use strict';

pinapleApp
  .factory('AuthSvc', ['$q', '$http', 'Restangular', 'User', 'NotifierSvc', function ($q, $http, Restangular, User, NotifierSvc) {

    var Auth = {
      user: {},
      loggedIn: false
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

    // logs user in by retrieving user info by session and setting hppt headers
    Auth.login = function(apiKey, authToken) {
      var self = this;
      var deferred = $q.defer();

      this.setHttpHeaders( apiKey, authToken );
      this.user = User.me();
      this.user.then(
        function (user) {
          self.loggedIn = true;
          self.currentUser = user;
          deferred.resolve( user );
        },
        function (response) {
          NotifierSvc.show( 'Could not retrieve user', response );
          deferred.reject( response );
        });

      return deferred.promise;
    };

    Auth.isAdmin = function(user) {
      return _.contains( this.user.roles, 'Admin' );
    };

    return Auth;

  }]);