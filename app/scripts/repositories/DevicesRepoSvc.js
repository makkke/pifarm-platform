'use strict';

pinapleApp
  .factory('DevicesRepoSvc', ['$http', '$q', 'Restangular',
    function ($http, $q, Restangular) {

    var Repo = {};
    var route = 'devices';

    Restangular.extendModel( route, function (model) {
      return model;
    });

    Repo.query = function () {
      return Restangular.all( route ).getList();
    };

    return Repo;

  }]);