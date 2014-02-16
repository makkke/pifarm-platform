module.exports = function() {
  return {
    basePath: '../',
    frameworks: ['mocha'],
    reporters: ['progress'],
    
    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],
    
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // web server port
    port: 8070,
    
    // list of files / patterns to exclude
    exclude: [],

    // these are default values anyway
    // if true, it capture browsers, run tests and exit
    singleRun: false,         
    colors: true,

    // list of files / patterns to load in the browser
    files: [
      // 3rd party code
      'app/bower_components/angular/angular.min.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/bower_components/angular-cookies/angular-cookies.js',
      'app/bower_components/angular-sanitize/angular-sanitize.js',
      'app/bower_components/angular-route/angular-route.js',

      'app/bower_components/lodash/dist/lodash.min.js',
      'app/bower_components/restangular/dist/restangular.min.js',
      'app/bower_components/angular-ui-router/release/angular-ui-router.min.js',

      // app specific code
      'app/scripts/*.js',
      'app/scripts/**/*.js',

      // test specific code
      'node_modules/chai/chai.js',
      'test/lib/chai-expect.js',
      'test/lib/chai-should.js'
    ]
  };
};
