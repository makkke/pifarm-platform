'use strict';

describe('Unit: Testing Dashboard Controller', function() {

  var DashboardCtrl, scope;

  beforeEach( module( 'pinapleApp' ) );

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    DashboardCtrl = $controller('DashboardCtrl', {
      $scope: scope
    });
  }));

  xit('should have the correct title', function() {
    expect( scope.title ).to.equal( 'Dashboard | Connio' );
  });

});