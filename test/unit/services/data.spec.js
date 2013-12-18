describe('Unit: Data Service', function() {

  beforeEach( angular.mock.module('connioApp') );

  it('should exists', inject(function (Data) {
    should.exist( Data );
  }));

  it('should contain app object', inject(function (Data) {
    should.exist( Data.app );
  }));

  it('should contain device object', inject(function (Data) {
    should.exist( Data.device );
  }));

  it('should contain account object', inject(function (Data) {
    should.exist( Data.account );
  }));

  it('should contain channel object', inject(function (Data) {
    should.exist( Data.channel );
  }));

  it('should contain trigger object', inject(function (Data) {
    should.exist( Data.trigger );
  }));

});