'use strict';

angular.module('pifarmApp')
  .factory('AccountsRepoSvc',
  ['Restangular',
  function (Restangular) {

    var Repo = {};
    var route = 'accounts';

    Restangular.extendModel( route, function (model) {
      model.get_fullname = function() {
        return this.first_name + ' ' + this.last_name;
      };

      return model;
    });

    Repo.me = function () {
      return Restangular.one( route, 'me' ).get();
    };

    Repo.check_password = function (password) {
      return Restangular.all( route ).all('check').post({password: password});
    };

    Repo.update = function (account) {
      return account.put();
    };

    return Repo;

  }]);