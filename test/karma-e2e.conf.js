var shared_config = require( './karma.conf' );

module.exports = function(config) {
  var conf = shared_config();

  conf.browsers = ['Chrome'];

  conf.files = conf.files.concat([
    // test files
    './test/e2e/**/*.js'
  ]);

  conf.urlRoot = '/__karma__/';

  conf.frameworks = ['ng-scenario'];

  config.set( conf );
};