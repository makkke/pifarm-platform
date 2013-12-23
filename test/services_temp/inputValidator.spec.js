describe('Unit: InputValidator Service', function() {

  var errors, maxInputLength, longName;
  
  beforeEach( angular.mock.module('connioApp') );

  beforeEach(inject(function (InputValidatorSvc) {
    maxInputLength = InputValidatorSvc.maxInputLength;
    // create name with more than max length 
    longName = '';
    for( var i = 0; i < maxInputLength+10; i++ ) {
      longName += 'a';
    };

    errors = {
      empty: 'Can not be empty.',
      tooLong: 'Max allowed length is ' + maxInputLength + ' characters.',
      incorrect: 'Can not start with one of the "-_." characters or contain space.'
    };
  }));

  it('should exists', inject(function (InputValidatorSvc) {
    should.exist( InputValidatorSvc );
  }));

  it('should have maxInputLength property', inject(function (InputValidatorSvc) {
    expect( InputValidatorSvc ).to.have.property( 'maxInputLength' );
  }));

  describe('checkName() function', function() {

    it('should exist', inject(function (InputValidatorSvc) {
      expect( InputValidatorSvc ).to.respondTo( 'checkName' );
    }));

    it('should allow name that contains number', inject(function (InputValidatorSvc) {
      var result = InputValidatorSvc.checkName( 'te1st' );
      expect( result ).to.be.ok;
    }));

    it('should allow name that contains dash', inject(function (InputValidatorSvc) {
      var result = InputValidatorSvc.checkName( 'te-st' );
      expect( result ).to.be.ok;
    }));

    it('should allow name that contains underscore', inject(function (InputValidatorSvc) {
      var result = InputValidatorSvc.checkName( 'te_st' );
      expect( result ).to.be.ok;
    }));

    it('should allow name that contains dot', inject(function (InputValidatorSvc) {
      var result = InputValidatorSvc.checkName( 'te.st' );
      expect( result ).to.be.ok;
    }));

    it('should return error if name is empty', inject(function (InputValidatorSvc) {
      var result = InputValidatorSvc.checkName( '' );
      expect( result.error ).to.equal( errors.empty );
    }));

    it('should return error if name is too long', inject(function (InputValidatorSvc) {
      var result = InputValidatorSvc.checkName( longName );
      expect( result.error ).to.equal( errors.tooLong );
    }));

    it('should return error if name starts with number', inject(function (InputValidatorSvc) {
      var result = InputValidatorSvc.checkName( '1test' );
      expect( result.error ).to.equal( errors.incorrect );
    }));

    it('should return error if name starts with dot', inject(function (InputValidatorSvc) {
      var result = InputValidatorSvc.checkName( '.test' );
      expect( result.error ).to.equal( errors.incorrect );
    }));

    it('should return error if name starts with underscore', inject(function (InputValidatorSvc) {
      var result = InputValidatorSvc.checkName( '_test' );
      expect( result.error ).to.equal( errors.incorrect );
    }));

    it('should return error if name starts with dash', inject(function (InputValidatorSvc) {
      var result = InputValidatorSvc.checkName( '-test' );
      expect( result.error ).to.equal( errors.incorrect );
    }));

    it('should return error if name contains space', inject(function (InputValidatorSvc) {
      var result = InputValidatorSvc.checkName( 'my test' );
      expect( result.error ).to.equal( errors.incorrect );
    }));


  });

});