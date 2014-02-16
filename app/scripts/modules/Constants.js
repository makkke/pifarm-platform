'use strict';

angular.module('pifarm.constants', [])
  .constant('Constants', {
    min_password_length: 6,
    min_session_token_length: 32,
    session_token_name: 'pifarm.session'
  });