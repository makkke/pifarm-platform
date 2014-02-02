'use strict';

pinapleApp
  .factory('DatastreamsRepoSvc',
  ['Restangular',
  function (Restangular) {

    var Repo = {};
    var route = 'datastreams';

    Restangular.extendModel( route, function (model) {
      return model;
    });

    Repo.query = function (repository_id) {
      return Restangular.all( route ).getList({
        repository: repository_id
      });
    };

    Repo.find = function (id) {
      return Restangular.one( route, id ).get();
    };

    Repo.create = function (datastream) {
      return Restangular.all( route ).post( datastream );
    };

    return Repo;

  }]);