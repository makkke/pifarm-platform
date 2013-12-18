var sharedConfig = require( './karma.conf' );

module.exports = function(config) {
  var conf = sharedConfig();

  conf.browsers = ['Chrome'],
  
  conf.files = conf.files.concat([
    // extra testing code
    'app/bower_components/angular-mocks/angular-mocks.js',

    // mocha stuff
    'test/mocha.conf.js',

    // test files
    './test/unit/**/*.js'
  ]);

  config.set( conf );
};
