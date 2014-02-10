'use strict';

pifarmApp
  .factory('DevicesRepoSvc',
  ['Restangular',
  function (Restangular) {

    var Repo = {};
    var route = 'devices';

    Restangular.extendModel( route, function (model) {
      return model;
    });

    Repo.query = function () {
      return Restangular.all( route ).getList();
    };

    Repo.create = function (device) {
      return Restangular.all( route ).post( device );
    };

    return Repo;

  }]);