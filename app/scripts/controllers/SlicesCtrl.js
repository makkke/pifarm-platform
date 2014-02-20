'use strict';

angular.module('pifarmApp')
  .controller('SlicesCtrl',
  ['$scope', '$window', 'SlicesRepoSvc', 'pinaple',
  function ($scope, $window, SlicesRepoSvc, pinaple) {

    $scope.title = 'Slices | Pinaple Farm';
    $window.document.title = $scope.title;

    SlicesRepoSvc.query( pinaple.id ).then(
      function (slices) {
        $scope.slices = slices;
      },
      function (error, status) {
        console.log( 'error:', error );
      });

  }]);
