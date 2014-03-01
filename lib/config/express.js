'use strict';

var express = require( 'express' ),
    path = require( 'path' ),
    config = require( './config' );

/**
 * Express configuration
 */
module.exports = function(app) {

  var dev_config = function () {
    app.use( require('connect-livereload')() );

    // disable caching of scripts for easier testing
    app.use(function noCache (req, res, next) {
      if( req.url.indexOf('/scripts/') === 0 ) {
        res.header( 'Cache-Control', 'no-cache, no-store, must-revalidate' );
        res.header( 'Pragma', 'no-cache' );
        res.header( 'Expires', 0 );
      }
      next();
    });

    app.use( express.static(path.join(config.root, '.tmp')) );
    app.use( express.static(path.join(config.root, 'app')) );
    app.use( express.errorHandler() );
    app.set( 'views', config.root + '/app/views' );
  };

  app.configure( 'development', dev_config );

  app.configure( 'svetik', dev_config );

  app.configure('test', function () {
    app.use( express.favicon(path.join(config.root, 'public', 'favicon.png')) );
    app.use( express.static(path.join(config.root, 'public')) );
    app.set( 'views', config.root + '/views' );
  });

  app.configure('production', function () {
    app.use( express.favicon(path.join(config.root, 'public', 'favicon.png')) );
    app.use( express.static(path.join(config.root, 'public')) );
    app.set( 'views', config.root + '/views' );
  });

  app.configure( function() {
    app.engine( 'html', require('ejs').renderFile );
    app.set( 'view engine', 'html' );
    app.use( express.logger('dev') );
    app.use( express.json() );
    app.use( express.urlencoded() );
    app.use( express.methodOverride() );
    // router needs to be last
    app.use( app.router );
  });

};