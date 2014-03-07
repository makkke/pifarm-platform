'use strict';

angular.module('pifarmApp')
  .factory('DevicesRepoSvc',
  ['Restangular',
  function (Restangular) {

    var Repo = {};
    var route = 'devices';

    Restangular.extendModel( route, function (model) {
      model.regenerate_key = function() {
        return model.all('keys').post();
      };

      return model;
    });

    Repo.create = function (device) {
      return Restangular.all( route ).post( device );
    };

    Repo.update = function (device) {
      return device.put();
    };

    Repo.all = function () {
      return Restangular.all( route ).getList();
    };

    Repo.find = function (id) {
      return Restangular.one( route, id ).get();
    };

    Repo.remove = function (device) {
      return Restangular.one( route, device.id ).remove();
    };

    return Repo;

  }]);