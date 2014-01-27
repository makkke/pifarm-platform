'use strict';

pinapleApp
  .factory('PinaplesRepoSvc', ['$http', '$q', 'Restangular',
    function ($http, $q, Restangular) {

    var Repo = {};
    var route = 'pinaples';

    Restangular.extendModel( route, function (model) {
      return model;
    });

    Repo.query = function () {
      return Restangular.all( route ).getList();
    };

    Repo.find = function (sid) {
      return Restangular.one( route, sid ).get();
    };

    Repo.create = function (pinaple) {
      return Restangular.all( route ).post( pinaple );
    };

    return Repo;

  }]);