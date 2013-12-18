
/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.render( 'index.html', { serverYear: 2013 } );
};