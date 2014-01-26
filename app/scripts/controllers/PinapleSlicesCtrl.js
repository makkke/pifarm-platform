'use strict';

pinapleApp
  .controller('PinapleSlicesCtrl',
  ['$scope', '$window', '$stateParams', 'PinaplesRepoSvc',
  function ($scope, $window, $stateParams, PinaplesRepoSvc) {
    
    $scope.title = 'Slices | Pinaple';
    $window.document.title = $scope.title;

    PinaplesRepoSvc.find( $stateParams.pinaple_sid ).then(
      function (pinaple) {
        $scope.pinaple = pinaple;
      },
      function (error, status) {
        console.log( 'error:', error );
      });

  }]);
