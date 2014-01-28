'use strict';

pinapleApp
  .controller('RepositoryCtrl',
  ['$scope', '$stateParams', 'repository',
  function ($scope, $stateParams, repository) {
    
    $scope.repository = repository;

  }]);
