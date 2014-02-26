'use strict';

angular.module('pifarmApp')
  .controller('SliceNewCtrl',
  ['$scope', '$window', '$stateParams', '$log', '$location', 'DataSvc', 'SlicesRepoSvc', 'ApiErrorSvc',
  function ($scope, $window, $stateParams, $log, $location, DataSvc, SlicesRepo, ApiErrorSvc) {

    $scope.title = 'Create a New Slice | Pinaple Farm';
    $window.document.title = $scope.title;

    $scope.loading = false;
    $scope.error = '';

    $scope.pinaple_id = $stateParams.pinaple_id;
    $scope.types = DataSvc.slice_types;

    $scope.$watch('slice.type', function (new_value) {
      if( new_value ) {
        $scope.load_units( new_value );
      }
    });

    $scope.slice = {
      pinaple: $scope.pinaple_id,
      direction: 'input',  // for now only available direction is input
      type: $scope.types[0].key
    };

    $scope.create = function(form, slice) {
      if( form.$valid ) {
        $scope.loading = true;

        SlicesRepo.create( slice ).then(
        function (slice) {
          $scope.loading = false;
          $location.url( 'pinaples/' + $scope.pinaple_id + '/slices' );
        },
        function (error) {
          $scope.loading = false;

          if( ApiErrorSvc.server_error( error.status ) ) {
            $scope.show_error( 'server' );
          }
          else {
            console.log(error.status, error);
          }
        });
      }
    };

    $scope.load_units = function (key) {
      var type = _.find( $scope.types, { key: key } );
      if( type ) {
        $scope.units = type.units;
        $scope.slice.unit = type.units[0].key;
      }
    };

    /*
     * Shows an error near input
     * @param string Error code, possible values 'format', 'server'
     * @return string New error code
     */
    $scope.show_error = function (error_code) {
      return $scope.error = error_code;
    };

  }]);
