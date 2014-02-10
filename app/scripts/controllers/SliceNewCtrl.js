'use strict';

pifarmApp
  .controller('SliceNewCtrl',
  ['$scope', '$window', '$stateParams', '$log', '$location', 'DataSvc', 'SlicesRepoSvc', 'ApiErrorSvc',
  function ($scope, $window, $stateParams, $log, $location, DataSvc, SlicesRepoSvc, ApiErrorSvc) {

    $scope.title = 'Create a New Slice | Pinaple Farm';
    $window.document.title = $scope.title;

    $scope.loading = false;
    $scope.button_text = 'Create Slice';
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

    $scope.add_slice = function(slice, form) {
      if( form.$valid ) {
        $scope.start_creating();

        SlicesRepoSvc.create( slice ).then(
          function (slice) {
            $scope.stop_creating();
            $location.url( 'pinaples/' + $scope.pinaple_id + '/slices' );
          },
          function (error, status) {
            $scope.stop_creating();
            if( ApiErrorSvc.is_server_error( status ) ) {
              $scope.show_error( 'server' );
              return;
            }

            $log.error( error );
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

    $scope.start_creating = function () {
      $scope.button_text = 'Creating Slice...';
      return $scope.loading = true;
    };

    $scope.stop_creating = function () {
      $scope.button_text = 'Create Slice';
      return $scope.loading = false;
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
