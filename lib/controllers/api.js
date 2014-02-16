'use strict';

var needle = require( 'needle' ),
    config = require( '../config/config.js' );

/**
 * Login an user
 */
exports.login = function (req, res) {
  var data = {
    username: req.body.username,
    password: req.body.password
  };

  needle.post(config.api_url('login'), data, function (error, http_res, body) {
    if( error ) {
      console.log( 'Error requesting login \n', error);
      res.status( 500 );
      res.send( 500 );
    }
    else {
      res.send( http_res.statusCode, body );
    }
  });
};

/**
 * Create new user
 */
exports.signup = function (req, res) {
  var data = {
    username:     req.body.username,
    password:     req.body.password,
    name:         req.body.name
  };

  needle.post(config.api_url('signup'), data, function (error, http_res, body) {
    if( error ) {
      console.log( 'Error requesting login \n', error);
      res.status( 500 );
      res.send( 500 );
    }
    else {
      res.send( http_res.statusCode, body );
    }
  });
};