'use strict';

angular.module('pifarmApp')
.controller('SlicesCtrl',
['$scope', 'SlicesRepoSvc', 'pinaple',
function ($scope, SlicesRepo, pinaple) {

  SlicesRepo.all( pinaple.id ).then(
    function (slices) {
      $scope.slices = slices;
    },
    function (error, status) {
      console.log( 'error:', error );
    });

}]);
