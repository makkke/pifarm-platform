'use strict';

angular.module('pifarm.config', [])
  .constant( 'Config', {
    api: {
      protocol: 'http',
      hostname: 'api.pinaplefarm.com',
      version: 'v1'
    }
  });