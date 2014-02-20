'use strict';

angular.module('pifarmApp')
  .factory('AuthSvc', ['$http', '$q', '$cookies', 'Constants', 'Restangular', 'AccountsRepoSvc', 'LocalStorageSvc',
    function ($http, $q, $cookies, Constants, Restangular, AccountsRepoSvc, LocalStorageSvc) {

    var Auth = {};

    Auth.signup = function (account) {
      var deferred = $q.defer();

      $http.post('/api/signup', {
        name:         account.name,
        email:        account.email,
        password:     account.password
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

      $http.post('/api/login', {
        username: credentials.username,
        password: credentials.password
      })
      .success(function (account) {
        console.log(account);
        var session_token = account.session_token;
        LocalStorageSvc.set( Constants.session_token_name, session_token );
        that._set_http_headers( session_token );
        that._set_user_account( account );

        deferred.resolve( account );
      })
      .error(function (error, status) {
        deferred.reject( error, status );
      });

      return deferred.promise;
    };

    Auth.logout = function () {
      LocalStorageSvc.remove( Constants.session_token_name );
      delete this.account; 
    };

    Auth.set_session_token = function () {
      this._set_http_headers( LocalStorageSvc.get( Constants.session_token_name ) );
    };

    Auth.update_user_account = function () {
      var that = this;
      var deferred = $q.defer();

      AccountsRepoSvc.me().then(
        function (account) {
          that._set_user_account( account );

          deferred.resolve( account );
        },
        function (error, status) {
          deferred.reject( error, status );
        });

      return deferred.promise;
    };

    Auth.logged_in = function () {
      var session_token = LocalStorageSvc.get( Constants.session_token_name );
      if( session_token ) {
        return session_token.length >= Constants.min_session_token_length;
      }

      return false;
    };

    Auth.logged_out = function () {
      return !this.logged_in();
    };

    Auth._set_http_headers = function (sessionToken) {
      var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
        'X-Pifarm-Session-Token': sessionToken
      }
      
      Restangular.setDefaultHeaders( headers );
    };

    Auth._set_user_account = function (account) {
      this.account = account;
    };

    return Auth;

  }]);