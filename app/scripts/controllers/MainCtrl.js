'use strict';

angular.module('pifarmApp')
  .controller('MainCtrl',
  ['$scope', 'Config',
  function ($scope, Config) {

    $scope.current_year = Config.current_year;
    
  }]);
