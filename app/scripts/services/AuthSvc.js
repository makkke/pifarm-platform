'use strict';

pinapleApp
  .factory('AuthSvc', ['$http', '$q', '$cookies', 'Restangular', 'AccountsRepoSvc', function ($http, $q, $cookies, Restangular, AccountsRepoSvc) {

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

      $http({
        method: 'GET',
        url: '/_login',
        data: {
          username: credentials.username,
          password: credentials.password
        }
      })
      .success(function (account) {
        var sessionToken = account.session_token;
        that._setHttpHeaders( sessionToken );
        that._setSessionTokenInBrowser( sessionToken );
        that._setUserAccount( account );

        deferred.resolve( account );
      })
      .error(function (error, status) {
        deferred.reject( error, status );
      });

      return deferred.promise;
    }

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
      return $cookies.pinapleSession;
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