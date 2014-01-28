'use strict';

pinapleApp
  .factory('RepositoriesRepoSvc',
  ['Restangular',
  function (Restangular) {

    var Repo = {};
    var route = 'repositories';

    Restangular.extendModel( route, function (model) {
      return model;
    });

    Repo.query = function () {
      return Restangular.all( route ).getList();
    };

    Repo.find = function (sid) {
      return Restangular.one( route, sid ).get();
    };

    Repo.create = function (repository) {
      return Restangular.all( route ).post( repository );
    };

    return Repo;

  }]);