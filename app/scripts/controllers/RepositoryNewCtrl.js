'use strict';

pinapleApp
  .controller('RepositoryNewCtrl',
  ['$scope', '$window', '$location', '$log', 'DevicesRepoSvc', 'RepositoriesRepoSvc', 'ApiErrorSvc',
  function ($scope, $window, $location, $log, DevicesRepoSvc, RepositoriesRepoSvc, ApiErrorSvc) {
    
    $scope.title = 'Create a New Repository | Pinaple';
    $window.document.title = $scope.title;

    $scope.loading = false;
    $scope.button_text = 'Create Repository';
    $scope.error = '';

    $scope.repository = {};
    
    DevicesRepoSvc.query().then(
      function (devices) {
        $scope.devices = devices;
        $scope.repository.device = devices[0].id;
      },
      function (error, status) {
        console.log( 'error:', error );
      });

    $scope.add_repository = function(repository, form) {
      if( form.$valid ) {
        $scope.start_creating();

        RepositoriesRepoSvc.create({
          name: repository.name,
          description: repository.description,
          devices: [repository.device]
        }).then(
          function (repository) {
            $scope.stop_creating();
            $location.url( 'repositories' );
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

    $scope.start_creating = function () {
      $scope.button_text = 'Creating Repository...';
      return $scope.loading = true;
    };

    $scope.stop_creating = function () {
      return $scope.button_text = 'Create Repository';
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
