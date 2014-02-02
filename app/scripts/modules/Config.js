'use strict';

angular.module('pinaple.config', [])
  .constant( 'Config', {
    api: {
      protocol: 'http',
      hostname: 'api.pinaple.com',
      version: 'v1'
    }
  });