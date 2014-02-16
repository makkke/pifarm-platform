'use strict';

var path = require( 'path' );

var rootPath = path.normalize( __dirname + '/../../..' );

module.exports = {
  root: rootPath,
  port: process.env.PORT || 3000,

  api_url: function (route) {
    return this.api.protocol + '://' + this.api.hostname + '/' + this.api.version + '/' + route;
  }
};