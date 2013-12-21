
/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.render( 'index.html', { serverCurrentYear: new Date().getFullYear() } );
};