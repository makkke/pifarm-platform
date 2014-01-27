'use strict';

pinapleApp
  .controller('PinapleSlicesCtrl',
  ['$scope', '$window', 'PinaplesRepoSvc', 'SlicesRepoSvc', 'pinaple',
  function ($scope, $window, PinaplesRepoSvc, SlicesRepoSvc, pinaple) {
    
    $scope.title = 'Slices | Pinaple';
    $window.document.title = $scope.title;

    SlicesRepoSvc.query( pinaple.sid ).then(
      function (slices) {
        $scope.slices = slices;
      },
      function (error, status) {
        console.log( 'error:', error );
      });

  }]);
