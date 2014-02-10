'use strict';

var express = require( 'express' );
var routes = require( './routes' );
var http = require( 'http' );
var path = require( 'path' );
var nconf = require( 'nconf' );
var querystring = require( 'querystring' );
var needle = require( 'needle' );

nconf
  .argv()
  .env()
  .file({ file: './config.json' });

// start express application
var app = express();

// all environments
app.set( 'port', process.env.PORT || 3000 );
app.set( 'view engine', 'ejs' );
app.engine( 'html', require( 'ejs' ).renderFile );
app.use( express.favicon( path.join( __dirname, 'app/images/favicon.png' ) ) );
app.use( express.logger( 'dev' ) );
app.use( express.json() );
app.use( express.bodyParser() );
app.use( express.urlencoded() );
app.use( express.methodOverride() );
app.use( express.cookieParser( 'pifarmcookie' ) );
app.use( express.session( { secret: 'pifarmsession' } ) );
app.use( app.router );

// development only
if( 'development' == app.get( 'env' ) ) {
  app.set( 'views', path.join( __dirname, 'app' ) );
  app.use( express.static( path.join( __dirname, 'app' ) ) );
  app.use( express.errorHandler() );
}
else {
  app.set( 'views', path.join( __dirname, 'dist' ) );
  app.use( express.static( path.join( __dirname, 'dist' ) ) );
}

// middleware function puts hash before req.params
// redirect logic falls back to angular
app.use(function (req, res) {
  if( req.url.substring(0, 1) !== '_' ) {
    return res.redirect(req.protocol + '://' + req.get( 'Host' ) + '/#' + req.url);
  }
});

/*
 * Main route to index page
 * @method GET
 */
app.get( '/', routes.index );

/*
 * Route to create a new account
 * @method POST
 * @data object User info
 */
app.post('/_signup', function (req, res) {
  var data = {
    username:     req.body.username,
    password:     req.body.password,
    first_name:   req.body.first_name,
    last_name:    req.body.last_name,
    company:      req.body.company,
    description:  req.body.description
  };

  var url = nconf.get( 'api:hostname' ) + '/' + nconf.get( 'api:version' ) + '/signup';

  needle.post(url, data, function (error, httpRes, body) {
    if( error ) {
      console.log( 'Got error: ' + JSON.stringify( error ) );
      return res.send( httpRes.statusCode, e.message );
    }

    res.send( httpRes.statusCode, body );
  });
});

/*
 * Route to login an user
 * @method GET
 * @data object Credentials
 */
app.post('/_login',
  function (req, res) {
    var data = {
      username: req.body.username,
      password: req.body.password
    };

    var url = nconf.get( 'api:hostname' ) + '/' + nconf.get( 'api:version' ) + '/login';

    needle.post(url, data, function (error, httpRes, body) {
      if( error ) {
        console.log( 'Got error: ' + JSON.stringify( error ) );
        return res.send( httpRes.statusCode, e.message );
      }

      res.send( httpRes.statusCode, body );
    });
  });

http.createServer( app ).listen(app.get( 'port' ), function() {
  console.log( 'Express server listening on port ' + app.get( 'port' ) );
});
