'use strict';

angular.module('pifarmApp')
  .factory('SlicesRepoSvc',
  ['Restangular',
  function (Restangular) {

    var Repo = {};
    var route = 'slices';

    Restangular.extendModel( route, function (model) {
      return model;
    });

    Repo.all = function (pinaple_id) {
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

    Repo.remove = function (slice) {
      return Restangular.one( route, slice.id ).remove();
    };

    return Repo;

  }]);