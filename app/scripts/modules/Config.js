'use strict';

angular.module('pinaple.config', [])
  .constant( 'Config', {
    api: {
      protocol: 'http',
      hostname: 'api.pinaplefarm.com',
      version: 'v1'
    }
  });