var sharedConfig = require( './karma.conf' );

module.exports = function(config) {
  var conf = sharedConfig();

  // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
  conf.logLevel = config.LOG_INFO,

  conf.files = conf.files.concat([
    // extra testing code
    'node_modules/ng-midway-tester/src/ngMidwayTester.js',

    // mocha stuff
    'test/mocha.conf.js',

    // test files
    'test/midway/appSpec.js',
    'test/midway/routesSpec.js',
    'test/midway/**/*.js'
  ]);

  conf.proxies = {
    '/': 'http://localhost:9999/'
  };

  config.set( conf );
};