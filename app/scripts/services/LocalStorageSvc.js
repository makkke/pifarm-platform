'use strict';

pinapleApp
  .factory('LocalStorageSvc', ['$cookieStore', function ($cookieStore) {

    var Storage = {};

    Storage.get = function (key) {
      return $cookieStore.get( key );
    };

    Storage.set = function (key, value) {
      return $cookieStore.put( key, value );
    };

    Storage.remove = function (key) {
      return $cookieStore.remove( key );
    };

    return Storage;

  }]);