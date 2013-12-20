'use strict';

pinapleApp
  .factory('PinapleRepo', ['Restangular', function (Restangular) {

    var route = 'pinaples';

    Restangular.extendModel( route, function (model) {
      model.getSlices = function() {
        return this.customGET( 'slices' );
      };

      return model;
    });

    return Restangular.all( route );

  }]);