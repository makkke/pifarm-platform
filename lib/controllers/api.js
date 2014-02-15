'use strict';

var needle = require( 'needle' ),
    config = require( '../config/config.js' );

var api_url = function (route) {
  return config.api.protocol + '://' + config.api.hostname + '/' + config.api.version + '/' + route;
};    

/**
 * Login an user
 */
exports.login = function(req, res) {
  var data = {
    username: req.body.username,
    password: req.body.password
  };

  needle.post(api_url('login'), data, function (error, http_res, body) {
    if( error ) {
      console.log( 'Got error: ' + JSON.stringify( error ) );
    }

    res.send( http_res.statusCode, body );
  });
};

/**
 * Create new user
 */
exports.signup = function(req, res) {
  var data = {
    username:     req.body.username,
    password:     req.body.password,
    name:         req.body.name
  };

  needle.post(api_url('signup'), data, function (error, http_res, body) {
    if( error ) {
      console.log( 'Got error: ' + JSON.stringify( error ) );
    }

    res.send( http_res.statusCode, body );
  });
};