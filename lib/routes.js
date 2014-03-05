'use strict';

var api   = require( './controllers/api' ),
    index = require( './controllers' );

/**
 * Application routes
 */
module.exports = function(app) {

  // server API Routes
  app.post( '/api/login', api.login );
  app.post( '/api/signup', api.signup );
  app.post( '/api/confirm', api.confirm );
  
  // all other routes to use Angular routing in app/scripts/app.js
  app.get( '/partials/*', index.partials );
  app.get( '/*', index.index );

};