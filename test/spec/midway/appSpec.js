/*
  Test goals
  - to see that the module is there and it works
  - to check to see if the dependencies are set for the module
*/

describe('Midway: Testing Modules', function() {
  describe('App Module:', function() {

    var module;
    beforeEach(function () {
      module = angular.module( 'pinapleApp' );
    });

    it('should be registered', function() {
      expect( module ).not.to.equal( null );
    });

    // test module's dependencies
    describe('Dependencies:', function() {

      var deps;
      var hasModule = function (moduleName) {
        return deps.indexOf( moduleName ) >= 0;
      };

      beforeEach(function () {
        deps = module.value( 'appName' ).requires;
      });

      it('should have ngCookies as a dependency', function() {
        expect( hasModule( 'ngCookies' ) ).to.equal( true );
      });

      it('should have ngResource as a dependency', function() {
        expect( hasModule( 'ngResource' ) ).to.equal( true );
      });

      it('should have ngSanitize as a dependency', function() {
        expect( hasModule( 'ngSanitize' ) ).to.equal( true );
      });

      it('should have ngRoute as a dependency', function() {
        expect( hasModule( 'ngRoute' ) ).to.equal( true );
      });

      it('should have pinaple.config as a dependency', function() {
        expect( hasModule( 'pinaple.config' ) ).to.equal( true );
      });

      it('should have ui.router as a dependency', function() {
        expect( hasModule( 'ui.router' ) ).to.equal( true );
      });

      it('should have restangular as a dependency', function() {
        expect( hasModule( 'restangular' ) ).to.equal( true );
      });

      it('should have angularSpinner as a dependency', function() {
        expect( hasModule( 'angularSpinner' ) ).to.equal( true );
      });

      it('should have ngClipboard as a dependency', function() {
        expect( hasModule( 'ngClipboard' ) ).to.equal( true );
      });

      it('should have ui-bootstrap as a dependency', function() {
        expect( hasModule( 'ui-bootstrap' ) ).to.equal( true );
      });

    });
  });
});
