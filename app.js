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

nconf
  .argv()
  .env()
  .file({ file: './config.json' });

// define the strategy to be used by PassportJS
passport.use(new LocalStrategy(
  function (username, password, done) {
    var options = {
      hostname: nconf.get( 'api:regular:hostname' ),
      port: nconf.get( 'api:regular:port' ),
      path: nconf.get( 'api:regular:version' ) + '/login',
      auth: username + ':' + password
    };

    http.get(options, function (response) {
      if( response.statusCode === 200 ) {
        response.setEncoding('utf8');
        response.on('data', function (data) {
          return done( null, data );
        });
      }
      else {
        return done( null, false );
      }
    }).on('error', function(e) {
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

// define a middleware function to be used for every secured routes
var auth = function(req, res, next) {
  if( !req.isAuthenticated() ) {
    res.send( 401 );
  }
  else {
    next();
  }
};

// start express application
var app = express();

// all environments
app.set( 'port', process.env.PORT || 3000 );
app.set( 'view engine', 'ejs' );
app.engine( 'html', require( 'ejs' ).renderFile );
app.use( express.favicon( path.join( __dirname, 'app/favicon.png' ) ) );
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

app.get( '/', routes.index );

// route to test if the user is logged in or not
app.get('/loggedin', function (req, res) {
  return '0';
  //res.send( req.isAuthenticated() ? req.user : '0' );
});

// route to login
app.post('/login',
  passport.authenticate( 'local' ),
  function (req, res) {
    res.send( req.user );
  });

// route to test login credentials
app.post('/testlogin', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  var options = {
    hostname: nconf.get( 'api:regular:hostname' ),
    port: nconf.get( 'api:regular:port' ),
    path: nconf.get( 'api:regular:version' ) + '/testlogin',
    auth: username + ':' + password
  };

  http.get(options, function (httpRes) {
    if( httpRes.statusCode === 200 ) {
      res.send( 200 );
    }
    else {
      res.send( 401 );
    }
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

// route to signup
app.post('/signup', function (req, res) {
  var data = {
    email: req.body.email,
    pwd: req.body.password,
  };
  var options = {
    hostname: nconf.get( 'api:admin:hostname' ),
    port: nconf.get( 'api:admin:port' ),
    path: '/tasks/sysacc?' + querystring.stringify( data ),
    method: 'POST'
  };

  var httpReq = http.request(options, function(httpRes) {
    // TODO: api engine never send 200 for now
    if( httpRes.statusCode === 200 ) {
      res.send( 200 );
    }
    else {
      httpRes.setEncoding('utf8');
      httpRes.on('data', function (data) {
        res.send( httpRes.statusCode, data );
      });
    }
  }).on('error', function(e) {
    console.log("Got error: " + JSON.stringify(e));
    res.send( 503, e.message );
  });

  httpReq.end();
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
