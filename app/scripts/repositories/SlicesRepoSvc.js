'use strict';

pifarmApp
  .factory('SlicesRepoSvc',
  ['Restangular',
  function (Restangular) {

    var Repo = {};
    var route = 'slices';

    Restangular.extendModel( route, function (model) {
      return model;
    });

    Repo.query = function (pinaple_id) {
      return Restangular.all( route ).getList({
        pinaple: pinaple_id
      });
    };

    Repo.find = function (id) {
      return Restangular.one( route, id ).get();
    };

    Repo.create = function (slice) {
      return Restangular.all( route ).post( slice );
    };

    return Repo;

  }]);