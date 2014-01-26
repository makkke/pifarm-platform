'use strict';

pinapleApp
  .controller('SliceNewCtrl',
  ['$scope', '$window', 'DataSvc',
  function ($scope, $window, DataSvc) {

    $scope.title = 'Create a New Slice | Pinaple';
    $window.document.title = $scope.title;

    $scope.types = DataSvc.slice_types;
    $scope.measurement_types = DataSvc.measurement_types;

    $scope.$watch('slice.measurement_type', function (new_value) {
      if( new_value ) {
        $scope.load_units( new_value );
      }
    });

    $scope.slice = {
      type: $scope.types[0].key,
      measurement_type: $scope.measurement_types[0].key
    };

    $scope.load_units = function (key) {
      var measurement_type = _.find( $scope.measurement_types, { key: key } );
      if( measurement_type ) {
        $scope.units = measurement_type.units;
        $scope.slice.unit = measurement_type.units[0].key;
      }
    };

  }]);
