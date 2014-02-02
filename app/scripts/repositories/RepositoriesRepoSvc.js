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

    Repo.find = function (id) {
      return Restangular.one( route, id ).get();
    };

    Repo.create = function (repository) {
      return Restangular.all( route ).post( repository );
    };

    return Repo;

  }]);