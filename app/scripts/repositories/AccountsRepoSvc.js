'use strict';

pinapleApp
  .factory('AccountsRepoSvc', ['Restangular', function (Restangular) {

    var Repo = {};
    var route = 'accounts';

    Repo.me = function () {
      return Restangular.all( route ).one( 'me' ).get();
    };

    return Repo;

  }]);