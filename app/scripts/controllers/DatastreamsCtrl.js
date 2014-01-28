'use strict';

pinapleApp
  .controller('DatastreamsCtrl',
  ['$scope', '$window', 'RepositoriesRepoSvc', 'DatastreamsRepoSvc', 'repository',
  function ($scope, $window, RepositoriesRepoSvc, DatastreamsRepoSvc, repository) {

    $scope.title = 'Datastreams | Pinaple';
    $window.document.title = $scope.title;

    DatastreamsRepoSvc.query( repository.sid ).then(
      function (datastreams) {
        $scope.datastreams = datastreams;
      },
      function (error, status) {
        console.log( 'error:', error );
      });

  }]);
