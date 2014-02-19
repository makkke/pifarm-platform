'use strict';

angular.module('pifarmApp')
  .filter('keyFilter', [function () {
    
    return function (key) {
      var MAX_LENGTH = 8;

      if( angular.isUndefined( key ) ) return;

      if( key.length <= MAX_LENGTH ) return key;

      return key.substring( 0, MAX_LENGTH ) + '...';
    }

  }]);