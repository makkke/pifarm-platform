'use strict';

angular.module('pifarmApp')
  .factory('AccountValidatorSvc', ['Constants', function (Constants) {

    var Validator = {};

    /*
     * Check if password is stronger than minimum length
     * @param string password
     * @return bool
     */
    Validator.check_password_length = function (password) {
      if( !password ) return false;
      return password.length >= Constants.min_password_length;
    };

    return Validator;

  }]);