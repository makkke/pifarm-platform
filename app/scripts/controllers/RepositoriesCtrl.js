'use strict';

pinapleApp
  .controller('RepositoriesCtrl', ['$scope', '$window', 'RepositoriesRepoSvc',
    function ($scope, $window, RepositoriesRepoSvc) {
    
    $scope.title = 'My Repositories | Pinaple';
    $window.document.title = $scope.title;

    RepositoriesRepoSvc.query().then(
      function (repositories) {
        $scope.repositories = repositories;
        console.log( repositories );
      },
      function (error, status) {
        console.log( 'error:', error );
      });

  }]);
