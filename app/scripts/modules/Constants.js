'use strict';

angular.module('pifarm.constants', [])
.constant('Constants', {

  session_token_name: 'pifarm.session',
  min_session_token_length: 32,

  min_password_length: 6,

  max_serial_number_length: 64
  
});