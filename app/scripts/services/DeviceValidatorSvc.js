'use strict';

angular.module('pifarmApp')
.factory('DeviceValidatorSvc',
  ['Constants',
  function (Constants) {

  var Validator = {};

  /*
   * Check if serial number is alphanumeric with dash(_ or -)
   * @param string serial_number
   * @return bool
   */
  Validator.check_serial_number_format = function(serial_number) {
    // serial number can be empty since optional
    if( !serial_number ) return true;
    if( serial_number.length > Constants.max_serial_number_length ) return false;

    var regex = /^[a-z0-9-_]*$/i;
    return regex.test( serial_number );
  };

  return Validator;

}]);