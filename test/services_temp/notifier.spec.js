describe('Unit: Notifier Service', function() {

  beforeEach( angular.mock.module('connioApp') );

  it('should exists', inject(function (Notifier) {
    should.exist( Notifier );
  }));

  it('should show success message', inject(function (Notifier) {
    var result = Notifier.success( 'Hi there', 'Title' );
    expect( result ).to.be.ok;
  }));

  it('should show error message', inject(function (Notifier) {
    var result = Notifier.error( 'Something happened', 'Title' );
    expect( result ).to.be.ok;
  }));

  describe('Function: success()', function() {

    it('should return true if message is provided', inject(function (Notifier) {
      var result = Notifier.success( 'Hi there' );
      expect( result ).to.be.ok;
    }));

    it('should return false if message is not provided', inject(function (Notifier) {
      var result = Notifier.success();
      expect( result ).to.be.false;
    }));

    it('should return true if title is not provided', inject(function (Notifier) {
      var result = Notifier.success( 'Hi there' );
      expect( result ).to.be.ok;
    }));

  });

  describe('Function: error()', function() {

    it('should return true if message is provided', inject(function (Notifier) {
      var result = Notifier.error( 'Hi there' );
      expect( result ).to.be.ok;
    }));

    it('should return false if message is not provided', inject(function (Notifier) {
      var result = Notifier.error();
      expect( result ).to.be.false;
    }));

    it('should return true if title is not provided', inject(function (Notifier) {
      var result = Notifier.error( 'Bad thing' );
      expect( result ).to.be.ok;
    }));

  });

});