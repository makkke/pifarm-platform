'use strict';

angular.module('pifarmApp')
  .controller('PinaplesCtrl',
  ['$scope', '$window', 'PinaplesRepoSvc',
  function ($scope, $window, PinaplesRepoSvc) {
    
    $scope.title = 'My Pinaples | Pinaple Farm';
    $window.document.title = $scope.title;

    PinaplesRepoSvc.query().then(
      function (pinaples) {
        $scope.pinaples = pinaples;
      },
      function (error, status) {
        console.log( 'error:', error );
      });

  }]);
