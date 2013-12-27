'use strict';

/**
 * Module dependencies.
 */

var express = require( 'express' );
var routes = require( './routes' );
var http = require( 'http' );
var path = require( 'path' );
var passport = require( 'passport' );
var LocalStrategy = require( 'passport-local' ).Strategy;
var nconf = require( 'nconf' );
var querystring = require( 'querystring' );
var needle = require( 'needle' );

nconf
  .argv()
  .env()
  .file({ file: './config.json' });

// define the strategy to be used by PassportJS
passport.use(new LocalStrategy(
  function (username, password, done) {
    var options = {
      hostname: nconf.get( 'api:hostname' ),
      path: '/' + nconf.get( 'api:version' ) + '/login',
      auth: username + ':' + password
    };

    console.log('creating request');
    http.get(options, function (response) {
      if( response.statusCode === 200 ) {
        response.setEncoding( 'utf8' );
        response.on('data', function (data) {
          return done( null, data );
        });
      }
      else {
        console.log('not authorized');
        return done( null, false );
      }
    }).on('error', function (e) {
      console.log( 'Got error: ' + JSON.stringify( e ) );
      return done( null, false );
    });
  }
));

// serialized and deserialized methods when got from session
passport.serializeUser(function (user, done) {
  done( null, user );
});
passport.deserializeUser(function (user, done) {
  done( null, user );
});

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
app.use( express.cookieParser( 'pinaplecookie' ) );
app.use( express.session( { secret: 'pinaplesession' } ) );
app.use( passport.initialize() );
app.use( passport.session() );
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
// app.use(function (req, res) {
//   if( req.url.substring(0, 1) !== '_' ) {
//     return res.redirect(req.protocol + '://' + req.get( 'Host' ) + '/#' + req.url);
//   }
// });

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

  console.log(JSON.stringify( data ));

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
app.get('/_login',
  function (req, res) {
    var data = {
      username: req.body.username,
      password: req.body.password
    };

    var url = nconf.get( 'api:hostname' ) + '/' + nconf.get( 'api:version' ) + '/login';

    needle.get(url, data, function (error, httpRes, body) {
      if( error ) {
        console.log( 'Got error: ' + JSON.stringify( error ) );
        return res.send( httpRes.statusCode, e.message );
      }

      res.send( httpRes.statusCode, body );
    });
  });

// route to test if the user is logged in or not
app.get('/loggedin', function (req, res) {
  res.send( req.isAuthenticated() ? req.user : '0' );
});

// route to test login credentials
app.post('/verify_credentials', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  var options = {
    hostname: nconf.get( 'api:hostname' ),
    path: '/' + nconf.get( 'api:version' ) + '/verify_credentials',
    auth: username + ':' + password
  };

  http.get(options, function (httpRes) {
    console.log( httpRes.statusCode );
    res.send( httpRes.statusCode );
  }).on('error', function (e) {
    console.log( 'Got error: ' + JSON.stringify( e ) );
    res.send( 401, e.message );
  });
});

// route to log out
app.post('/logout', function (req, res){
  req.logOut();
  res.send( 200 );
});

// route to reset password
app.post('/remember',
  function(req, res) {
    var data = {
      email: req.body.email
    };
    var options = {
      method: 'POST',
      hostname: nconf.get( 'api:admin:hostname' ),
      port: nconf.get( 'api:admin:port' ),
      path: '/tasks/resetpwd?' + querystring.stringify( data )
    };

    var httpReq = http.request(options, function(httpRes) {
      res.send( 200 );
    }).on('error', function(e) {
      console.log("Got error: " + JSON.stringify(e));
      res.send( 503, e.message );
    });

    httpReq.end();
  });

http.createServer( app ).listen(app.get( 'port' ), function() {
  console.log( 'Express server listening on port ' + app.get( 'port' ) );
});
