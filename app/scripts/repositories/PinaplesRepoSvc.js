'use strict';

angular.module('pifarmApp')
  .factory('PinaplesRepoSvc',
  ['Restangular',
  function (Restangular) {

    var Repo = {};
    var route = 'pinaples';

    Restangular.extendModel( route, function (model) {
      return model;
    });

    Repo.query = function () {
      return Restangular.all( route ).getList();
    };

    Repo.find = function (id) {
      return Restangular.one( route, id ).get();
    };

    Repo.create = function (pinaple) {
      return Restangular.all( route ).post( pinaple );
    };

    Repo.update = function (pinaple) {
      return pinaple.put();
    };

    Repo.remove = function (pinaple) {
      return Restangular.one( route, pinaple.id ).remove();
    };

    Repo.add_device = function (pinaple, device_id) {
      return Restangular.one( route, pinaple.id )
                        .all('devices').post({ device:device_id });
    };

    Repo.remove_device = function (pinaple, device_id) {
      return Restangular.one( route, pinaple.id )
                        .one( 'devices', device_id ).remove();
    };

    return Repo;

  }]);