/*
  Test goals
  - to see that the module is there and it works
  - to check to see if the dependencies are set for the module
*/

describe('Midway: Testing Modules', function() {
  describe('App Module:', function() {

    var module;
    beforeEach(function() {
      module = angular.module( 'connioApp' );
    });

    it('should be registered', function() {
      expect( module ).not.to.equal( null );
    });

    // test module's dependencies
    describe('Dependencies:', function() {

      var deps;
      var hasModule = function(moduleName) {
        return deps.indexOf( moduleName ) >= 0;
      };

      beforeEach(function() {
        deps = module.value('appName').requires;
      });

      it('should have ngAnimate as a dependency', function() {
        expect( hasModule( 'ngAnimate' ) ).to.equal( true );
      });

      it('should have restangular as a dependency', function() {
        expect( hasModule( 'restangular' ) ).to.equal( true );
      });

      it('should have ui.select2 as a dependency', function() {
        expect( hasModule( 'ui.select2' ) ).to.equal( true );
      });

      it('should have toaster as a dependency', function() {
        expect( hasModule( 'toaster' ) ).to.equal( true );
      });

      it('should have ui.bootstrap as a dependency', function() {
        expect( hasModule( 'ui.bootstrap' ) ).to.equal( true );
      });

      it('should have xeditable as a dependency', function() {
        expect( hasModule( 'xeditable' ) ).to.equal( true );
      });

      it('should have angularMoment as a dependency', function() {
        expect( hasModule( 'angularMoment' ) ).to.equal( true );
      });

      it('should have ui.router as a dependency', function() {
        expect( hasModule( 'ui.router' ) ).to.equal( true );
      });

      it('should have angularFileUpload as a dependency', function() {
        expect( hasModule( 'angularFileUpload' ) ).to.equal( true );
      });

      it('should have angularSpinner as a dependency', function() {
        expect( hasModule( 'angularSpinner' ) ).to.equal( true );
      });

      it('should have appConfig as a dependency', function() {
        expect( hasModule( 'appConfig' ) ).to.equal( true );
      });

      it('should have ui.unique as a dependency', function() {
        expect( hasModule( 'ui.unique' ) ).to.equal( true );
      });

      it('should have ui.map as a dependency', function() {
        expect( hasModule( 'ui.map' ) ).to.equal( true );
      });

      it('should have googlechart as a dependency', function() {
        expect( hasModule( 'googlechart' ) ).to.equal( true );
      });
    });
  });
});
