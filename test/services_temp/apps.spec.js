describe('Unit: Apps Service', function() {

  // API
  var Restangular, $httpBackend;
  var appsModel, appUsage, appLogs, appTriggers, appChannels;

  // utils
  // TODO: move to a separate service
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
    appsModel = [
      { sid: 111, display_name: 'My App' },
      { sid: 222, display_name: 'Your App' },
    ];

    appUsage = { total_api_calls: 5 };
    appLogs = [{ type: 'log', message: 'everything is ok' }];
    appTriggers = [{ name: 'too hot' }];
    appChannels = [{ display_name: 'Temperature' }];

    // resource routes
    $httpBackend = $injector.get( '$httpBackend' );
    var Config = $injector.get( 'Config' );
    var route = Config.apiUrl + '/' + Config.apiVersion;
    $httpBackend.whenGET( route + '/_apps' ).respond( appsModel );
    $httpBackend.whenGET( route + '/_apps/111' ).respond( appsModel[0] );
    $httpBackend.whenGET( route + '/_apps/111/_usage' ).respond( appUsage );
    $httpBackend.whenGET( route + '/_apps/111/_logs' ).respond( appLogs );
    $httpBackend.whenGET( route + '/_apps/111/_triggers' ).respond( appTriggers );
    $httpBackend.whenGET( route + '/_channels?app=111' ).respond( appChannels );
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should exists', inject(function (AppsSvc) {
    should.exist( AppsSvc );
  }));

  describe('getUsage() function', function() {
    it('should exist', inject(function (AppsSvc) {
      AppsSvc.get( 111 ).then(
        function (app) {
          expect( app ).to.respondTo( 'getUsage' );
        });
      $httpBackend.flush();
    }));

    it('should return app usage', inject(function (AppsSvc) {
      AppsSvc.get( 111 ).then(
        function (app) {
          app.getUsage().then(
            function (usage) {
              expect( sanitizeRestangularOne( usage ) ).to.deep.equal( sanitizeRestangularOne( appUsage ) );
            });
        });
      $httpBackend.flush();
    }));
  });

  describe('getLogs() function', function() {
    it('should exist', inject(function (AppsSvc) {
      AppsSvc.get( 111 ).then(
        function (app) {
          expect( app ).to.respondTo( 'getLogs' );
        });
      $httpBackend.flush();
    }));

    it('should return account logs', inject(function (AppsSvc) {
      AppsSvc.get( 111 ).then(
        function (app) {
          app.getLogs().then(
            function (logs) {
              expect( sanitizeRestangularOne( logs ) ).to.deep.equal( sanitizeRestangularOne( appLogs ) );
            });
        });
      $httpBackend.flush();
    }));
  });

  describe('getTriggers() function', function() {
    it('should exist', inject(function (AppsSvc) {
      AppsSvc.get( 111 ).then(
        function (app) {
          expect( app ).to.respondTo( 'getTriggers' );
        });
      $httpBackend.flush();
    }));

    it('should return account triggers', inject(function (AppsSvc) {
      AppsSvc.get( 111 ).then(
        function (app) {
          app.getTriggers().then(
            function (triggers) {
              expect( sanitizeRestangularOne( triggers ) ).to.deep.equal( sanitizeRestangularOne( appTriggers ) );
            });
        });
      $httpBackend.flush();
    }));
  });

  describe('getChannels() function', function() {
    it('should exist', inject(function (AppsSvc) {
      AppsSvc.get( 111 ).then(
        function (app) {
          expect( app ).to.respondTo( 'getChannels' );
        });
      $httpBackend.flush();
    }));

    it('should return account channels', inject(function (AppsSvc) {
      AppsSvc.get( 111 ).then(
        function (app) {
          app.getChannels().then(
            function (channels) {
              expect( sanitizeRestangularOne( channels ) ).to.deep.equal( sanitizeRestangularOne( appChannels ) );
            });
        });
      $httpBackend.flush();
    }));
  });

});