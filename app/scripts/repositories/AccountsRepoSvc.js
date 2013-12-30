'use strict';

pinapleApp
  .factory('AccountsRepoSvc', ['$http', '$q', 'Restangular', function ($http, $q, Restangular) {

    var Repo = {};
    var route = 'accounts';

    Restangular.extendModel( route, function (model) {
      model.get_fullname = function() {
        return this.first_name + ' ' + this.last_name;
      };

      return model;
    });

    Repo.me = function () {
      return Restangular.one( route, 'me' ).get();
    };

    return Repo;

  }]);