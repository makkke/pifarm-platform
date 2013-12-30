'use strict';

pinapleApp
  .factory('AuthSvc', ['$http', '$q', '$cookies', 'Restangular', 'AccountsRepoSvc', 'LocalStorageSvc', function ($http, $q, $cookies, Restangular, AccountsRepoSvc, LocalStorageSvc) {

    var SESSION_TOKEN_NAME = 'pinaple.session';

    var Auth = {};

    Auth.signup = function (user) {
      var deferred = $q.defer();

      $http.post('/_signup', {
        username:     user.username,
        password:     user.password,
        first_name:   user.first_name,
        last_name:    user.last_name,
        company:      user.company,
        description:  user.description
      })
        .success(function (data, status) {
          deferred.resolve( data );
        })
        .error(function (error, status) {
          deferred.reject( error, status );
        });

      return deferred.promise;
    };

    Auth.login = function (credentials) {
      var that = this;
      var deferred = $q.defer();

      $http.post('/_login', {
        username: credentials.username,
        password: credentials.password
      })
      .success(function (account) {
        var session_token = account.session_token;
        LocalStorageSvc.set( SESSION_TOKEN_NAME, session_token );
        that._setHttpHeaders( session_token );
        that._setUserAccount( account );

        deferred.resolve( account );
      })
      .error(function (error, status) {
        deferred.reject( error, status );
      });

      return deferred.promise;
    };

    Auth.logout = function() {
      LocalStorageSvc.remove( SESSION_TOKEN_NAME );
      delete this.account; 
    };

    Auth.setSessionToken = function() {
      this._setHttpHeaders( LocalStorageSvc.get( SESSION_TOKEN_NAME ) );
    };

    Auth.updateUserAccount = function () {
      var that = this;
      var deferred = $q.defer();

      AccountsRepoSvc.me().then(
        function (account) {
          that._setUserAccount( account );

          deferred.resolve( account );
        },
        function (error, status) {
          deferred.reject( error, status );
        });

      return deferred.promise;
    };

    Auth.loggedIn = function () {
      var minimumSessionTokenLength = 32;
      var session_token = LocalStorageSvc.get( SESSION_TOKEN_NAME );
      if( session_token ) {
        return session_token.length >= minimumSessionTokenLength;
      }

      return false;
    };

    Auth._setHttpHeaders = function(sessionToken) {
      var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
        'X-Pinaple-Session-Token': sessionToken
      }
      
      Restangular.setDefaultHeaders( headers );
    };

    Auth._setSessionTokenInBrowser = function(sessionToken) {
      $cookies.pinapleSession = sessionToken;
    };

    Auth._setUserAccount = function(account) {
      this.account = account;
    };

    return Auth;

  }]);