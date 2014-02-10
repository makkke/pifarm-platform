'use strict';

angular.module('pifarm.constants', [])
  .constant( 'MIN_PASSWORD_LENGTH', 6 )
  .constant( 'MIN_SESSION_TOKEN_LENGTH', 32 )
  .constant( 'SESSION_TOKEN_NAME', 'pifarm.session' );