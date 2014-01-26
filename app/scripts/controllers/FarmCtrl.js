'use strict';

pinapleApp
  .controller('FarmCtrl', ['$scope', '$window', 'PinaplesRepoSvc',
    function ($scope, $window, PinaplesRepoSvc) {
    
    $scope.title = 'My Farm | Pinaple';
    $window.document.title = $scope.title;

    PinaplesRepoSvc.query().then(
      function (pinaples) {
        $scope.pinaples = pinaples;
      },
      function (error, status) {
        console.log( 'error:', error );
      });

  }]);
