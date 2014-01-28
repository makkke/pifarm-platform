'use strict';

pinapleApp
  .controller('RepositoryCtrl',
  ['$scope', 'repository',
  function ($scope, repository) {
    
    $scope.repository = repository;

  }]);
