'use strict';

pinapleApp
  .controller('DatastreamNewCtrl',
  ['$scope', '$window', '$stateParams', '$log', '$location', 'DataSvc', 'DatastreamsRepoSvc', 'ApiErrorSvc',
  function ($scope, $window, $stateParams, $log, $location, DataSvc, DatastreamsRepoSvc, ApiErrorSvc) {

    $scope.title = 'Create a New Datastream | Pinaple';
    $window.document.title = $scope.title;

    $scope.loading = false;
    $scope.button_text = 'Create Datastream';
    $scope.error = '';

    $scope.repository_id = $stateParams.repository_id;
    $scope.types = DataSvc.datastream_types;

    $scope.$watch('datastream.type', function (new_value) {
      if( new_value ) {
        $scope.load_units( new_value );
      }
    });

    $scope.datastream = {
      repository: $scope.repository_id,
      direction: 'input',  // for now only available direction is input
      type: $scope.types[0].key
    };

    $scope.add_datastream = function(datastream, form) {
      if( form.$valid ) {
        $scope.start_creating();

        DatastreamsRepoSvc.create( datastream ).then(
          function (datastream) {
            $scope.stop_creating();
            $location.url( 'repositories/' + $scope.repository_id + '/datastreams' );
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
        $scope.datastream.unit = type.units[0].key;
      }
    };

    $scope.start_creating = function () {
      $scope.button_text = 'Creating Datastream...';
      return $scope.loading = true;
    };

    $scope.stop_creating = function () {
      $scope.button_text = 'Create Datastream';
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
