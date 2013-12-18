var sharedConfig = require( './karma.conf' );

module.exports = function(config) {
  var conf = sharedConfig();

  conf.browsers = ['Chrome'];

  conf.files = conf.files.concat([
    // test files
    './test/e2e/**/*.js'
  ]);

  conf.urlRoot = '/__karma__/';

  conf.frameworks = ['ng-scenario'];

  config.set( conf );
};