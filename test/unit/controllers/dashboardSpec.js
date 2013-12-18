'use strict';

describe('Unit: Testing Dashboard Controller', function() {

  var DashboardCtrl, scope;

  beforeEach( module( 'connioApp' ) );

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    DashboardCtrl = $controller('DashboardCtrl', {
      $scope: scope
    });
  }));

  it('should have the correct title', function() {
    expect( scope.title ).to.equal( 'Dashboard | Connio' );
  });

});