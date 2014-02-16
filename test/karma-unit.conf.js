var shared_config = require( './karma.conf' );

module.exports = function (config) {
  var conf = shared_config();

  conf.browsers = ['PhantomJS'],
  
  conf.files = conf.files.concat([
    // extra testing code
    'app/bower_components/angular-mocks/angular-mocks.js',

    // mocha stuff
    'test/mocha.conf.js',

    // test files
    './test/spec/unit/**/*.js'
  ]);

  // level of logging
  // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
  logLevel: config.LOG_INFO

  config.set( conf );
};
