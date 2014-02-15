'use strict';

var express = require( 'express' );
var querystring = require( 'querystring' );

/**
 * Main application file
 */

// set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// application Config
var config = require( './lib/config/config' );

var app = express();

// express settings
require( './lib/config/express' )(app);

// routing
require('./lib/routes')(app);

// start server
app.listen(config.port, function () {
  console.log('Express server listening on port %d in %s mode', config.port, app.get('env'));
});

// expose app
exports = module.exports = app;
