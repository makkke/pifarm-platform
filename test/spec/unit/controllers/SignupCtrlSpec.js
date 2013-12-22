'use strict';

describe('Unit: Testing Signup Controller', function() {

  var scope, SignupCtrl;

  var mockDataSvc = {
    someAsyncCall: function (x){
      return 'weee';
    },
    descriptionTypes: [1, 2, 3]
  }

  beforeEach( module( 'pinapleApp' ) );

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    SignupCtrl = $controller('SignupCtrl', {
      $scope: scope,
      DataSvc: mockDataSvc
    });
  }));

  it('should have a SignupCtrl controller', function() {
    expect( pinapleApp.SignupCtrl ).not.to.equal( null );
  });

  it('should have the correct title', function() {
    expect( scope.title ).to.equal( 'Sign Up | Pinaple' );
  });

  it('should set "loading" to false', function() {
    expect( scope.loading ).to.be.false;
  });

  it('should set description types from DataSvc', function() {
    expect( scope.descriptionTypes ).to.equal( mockDataSvc.descriptionTypes );
  });

  describe('startSpinner() function', function () {
    it('should set "loading" to true if it already true', function() {
      scope.loading = true;
      scope.startSpinner();
      expect( scope.loading ).to.be.true;
    });

    it('should set "loading" to true', function() {
      scope.loading = false;
      scope.startSpinner();
      expect( scope.loading ).to.be.true;
    });

    it('should return new "loading" status', function() {
      scope.loading = false;
      expect( scope.startSpinner() ).to.be.true;
    });
  });

  describe('stopSpinner() function', function () {
    it('should set "loading" to false if it already false', function() {
      scope.loading = false;
      scope.stopSpinner();
      expect( scope.loading ).to.be.false;
    });

    it('should set "loading" to false', function() {
      scope.loading = true;
      scope.stopSpinner();
      expect( scope.loading ).to.be.false;
    });

    it('should return new "loading" status', function() {
      scope.loading = true;
      expect( scope.stopSpinner() ).to.be.false;
    });
  });

  describe('showError() function', function () {
    it('should set "error" to error code', function() {
      scope.showError( 'used' );
      expect( scope.error ).to.equal( 'used' );
    });

    it('should return new error code', function() {
      expect( scope.showError( 'used' ) ).to.equal( 'used' );
    });
  });

  describe('checkPasswordLength() function', function () {
    it('should return true if password is 6 chars', function() {
      expect( scope.checkPasswordLength( 'popkas' ) ).to.be.true;
    });

    it('should return true if password is 10 chars', function() {
      expect( scope.checkPasswordLength( 'popkasishe' ) ).to.be.true;
    });

    it('should return false if password is 5 chars', function() {
      expect( scope.checkPasswordLength( 'popka' ) ).to.be.false;
    });

    it('should return false if password is 2 chars', function() {
      expect( scope.checkPasswordLength( 'po' ) ).to.be.false;
    });

    it('should return false if password is 1 chars', function() {
      expect( scope.checkPasswordLength( 'po' ) ).to.be.false;
    });

    it('should return false if password is empty', function() {
      expect( scope.checkPasswordLength( '' ) ).to.be.false;
    });

    it('should return false if password not provided', function() {
      expect( scope.checkPasswordLength() ).to.be.false;
    });
  });

  describe('checkPasswordsMatch() function', function () {
    it('should return true if passwords match by case', function() {
      expect( scope.checkPasswordsMatch( 'peter', 'peter' ) ).to.be.true;
    });

    it('should return false if passwords do not match by case', function() {
      expect( scope.checkPasswordsMatch( 'peter', 'Peter' ) ).to.be.false;
    });

    it('should return false if passwords do not match', function() {
      expect( scope.checkPasswordsMatch( 'peter', 'meg' ) ).to.be.false;
    });

    it('should return false if first password not provided', function() {
      expect( scope.checkPasswordsMatch( undefined , 'meg' ) ).to.be.false;
    });

    it('should return false if confirmation not provided', function() {
      expect( scope.checkPasswordsMatch( 'peter' ) ).to.be.false;
    });

    it('should return true if both empty', function() {
      expect( scope.checkPasswordsMatch( '', '' ) ).to.be.true;
    });
  });

});