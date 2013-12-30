'use strict';

angular.module('pinaple.constants', [])
  .constant( 'MIN_PASSWORD_LENGTH', 6 )
  .constant( 'MIN_SESSION_TOKEN_LENGTH', 32 )
  .constant( 'SESSION_TOKEN_NAME', 'pinaple.session' );