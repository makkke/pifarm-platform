'use strict';

pinapleApp
  .factory('AccountsRepoSvc', ['$http', '$q', 'Restangular', function ($http, $q, Restangular) {

    var Repo = {};
    var route = 'accounts';

    Repo.me = function () {
      return Restangular.one( 'accounts', 'me' ).get();
    };

    return Repo;

  }]);