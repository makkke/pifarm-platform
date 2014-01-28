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

    Repo.query = function (repository_sid) {
      return Restangular.all( route ).getList({
        repository: repository_sid
      });
    };

    Repo.find = function (sid) {
      return Restangular.one( route, sid ).get();
    };

    Repo.create = function (datastream) {
      return Restangular.all( route ).post( datastream );
    };

    return Repo;

  }]);