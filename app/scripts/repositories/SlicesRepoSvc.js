'use strict';

pinapleApp
  .factory('SlicesRepoSvc',
  ['$http', '$q', 'Restangular',
  function ($http, $q, Restangular) {

    var Repo = {};
    var route = 'slices';

    Restangular.extendModel( route, function (model) {
      return model;
    });

    Repo.query = function (device_sid) {
      return Restangular.all( route ).getList( {device: device_sid} );
    };

    Repo.find = function (sid) {
      return Restangular.one( route, sid ).get();
    };

    Repo.create = function (slice) {
      console.log('slice:', slice);
      return Restangular.all( route ).post( slice );
    };

    return Repo;

  }]);