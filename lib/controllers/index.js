'use strict';

var path    = require( 'path' ),
    config  = require( '../config/config.js' );

/**
 * Send partial, or 404 if it doesn't exist
 */
exports.partials = function (req, res) {
  var stripped = req.url.split('.')[0];
  var requested_view = path.join( './', req.url );
  res.render(requested_view, function (error, html) {
    if( error ) {
      console.log( 'Error rendering partial "' + requested_view + '"\n"', error);
      res.status( 404 );
      res.send( 404 );
    } 
    else {
      res.send( html );
    }
  });
};

/**
 * Send our single page app
 */
exports.index = function (req, res) {
  res.render( 'index.html', {
    current_year: new Date().getFullYear(),
    config: config
  });
};
