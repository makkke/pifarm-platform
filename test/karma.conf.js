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
    port: 8080,
    
    // list of files / patterns to exclude
    exclude: [],

    // these are default values anyway
    // if true, it capture browsers, run tests and exit
    singleRun: false,         
    colors: true,

    // list of files / patterns to load in the browser
    files: [
      // 3rd party code
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-animate/angular-animate.js',
      'app/bower_components/lodash/lodash.js',
      'app/bower_components/restangular/dist/restangular.js',
      'app/bower_components/angular-ui-select2/src/select2.js',
      'app/bower_components/AngularJS-Toaster/toaster.js',
      'app/external_components/ui-bootstrap/ui-bootstrap-0.7.0.min.js',
      'app/external_components/ui-bootstrap/ui-bootstrap-tpls-0.7.0.min.js',
      'app/bower_components/angular-xeditable/dist/js/xeditable.js',
      'app/bower_components/angular-moment/angular-moment.js',
      'app/bower_components/angular-ui-router/release/angular-ui-router.js',
      'app/bower_components/angularjs-file-upload/angular-file-upload.min.js',
      'app/bower_components/angular-spinner/angular-spinner.min.js',
      'app/bower_components/angular-ui-utils/modules/unique/unique.js',
      'app/bower_components/angular-ui-map/src/map.js',
      'app/bower_components/angular-ui-utils/modules/event/event.js',
      'app/bower_components/angular-google-chart/ng-google-chart.js',

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
