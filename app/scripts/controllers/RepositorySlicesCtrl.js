'use strict';

pinapleApp
  .controller('RepositorySlicesCtrl',
  ['$scope', '$window', 'RepositoriesRepoSvc', 'SlicesRepoSvc', 'repository',
  function ($scope, $window, RepositoriesRepoSvc, SlicesRepoSvc, repository) {

    $scope.title = 'Slices | Pinaple';
    $window.document.title = $scope.title;

    SlicesRepoSvc.query( repository.sid ).then(
      function (slices) {
        $scope.slices = slices;
      },
      function (error, status) {
        console.log( 'error:', error );
      });

  }]);
