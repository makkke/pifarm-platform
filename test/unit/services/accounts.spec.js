describe('Unit: Accounts Service', function() {

  // API
  var Restangular, $httpBackend;
  var accountsModel, currentAccount;

  // utils
  // apply 'sanitizeRestangularOne' function to an array of items
  function sanitizeRestangularAll(items) {
    var all = _.map(items, function (item) {
      return sanitizeRestangularOne( item );
    });
    return sanitizeRestangularOne( all );
  };

  // remove all Restangular/AngularJS added methods in order to use Jasmine toEqual between the retrieve resource and the model
  function sanitizeRestangularOne(item) {
    return _.omit(item, 'route', 'parentResource', 'getList', 'get', 'post', 'put', 'remove', 'head', 'trace', 'options', 'patch',
      '$then', '$resolved', 'restangularCollection', 'customOperation', 'customGET', 'customPOST',
      'customPUT', 'customDELETE', 'customGETLIST', '$getList', '$resolved', 'restangularCollection', 'one', 'all','doGET', 'doPOST',
      'doPUT', 'doDELETE', 'doGETLIST', 'addRestangularMethod', 'getRestangularUrl', 'several',
      'clone', 'withHttpConfig', 'oneUrl', 'allUrl');
  };

  // load required modules
  beforeEach( angular.mock.module('connioApp') );

  // init http mock and resources
  beforeEach(inject(function ($injector) {
    // model
    accountsModel = [
      { sid: 111, display_name: 'Peter Griffin', status: 'Active' },
      { sid: 222, display_name: 'Meg Griffin', status: 'Closed' },
    ];
    currentAccount = { sid: 123, display_name: 'Slava', status: 'Active' };

    // resource routes
    $httpBackend = $injector.get( '$httpBackend' );
    var Config = $injector.get( 'Config' );
    var route = Config.apiUrl + '/' + Config.apiVersion;
    $httpBackend.whenGET( route + '/_accounts' ).respond( accountsModel );
    $httpBackend.whenGET( route + '/_accounts/me' ).respond( currentAccount );
    $httpBackend.whenGET( route + '/_accounts/0' ).respond( accountsModel[0] );
    $httpBackend.whenPOST( route + '/_accounts/111/_authtoken' ).respond( accountsModel[0] );
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should exists', inject(function (AccountsSvc) {
    should.exist( AccountsSvc );
  }));

  describe('me() function', function() {
    it('should exist', inject(function (AccountsSvc) {
      expect( AccountsSvc ).to.respondTo( 'me' );
    }));

    it('should return current account', inject(function (AccountsSvc) {
      AccountsSvc.me().then(
        function (account) {
          expect( sanitizeRestangularOne( account ) ).to.deep.equal( sanitizeRestangularOne( currentAccount ) );
        });
      $httpBackend.flush();
    }));
  });

  describe('regenAuthToken() function', function() {
    it('should exist', inject(function (AccountsSvc) {
      AccountsSvc.get(0).then(
        function (account) {
          expect( account ).to.respondTo( 'regenAuthToken' );
        });
      $httpBackend.flush();
    }));

    it('should regenerate account auth token', inject(function (AccountsSvc) {
      AccountsSvc.get( 0 ).then(
        function (account) {
          account.regenAuthToken().then(
            function (account) {
              expect( sanitizeRestangularAll( account ) ).to.deep.equal( sanitizeRestangularAll( accountsModel[0] ) );
            });
        });
      $httpBackend.flush();
    }));
  });

});