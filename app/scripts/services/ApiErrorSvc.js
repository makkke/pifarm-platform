'use strict';

angular.module('pifarmApp')
.factory('ApiErrorSvc', [function () {

  var ApiError = {
    http_statuses: {
      ok: 200,
      created: 201,

      bad_request: 400,
      unauthorized: 401,
      not_found: 404,
      NotAcceptable: 406,
      UnprocessableEntity: 422,

      internal_server_error: 500,
      BadGateway: 502,
      ServiceUnavailable: 503,
    }
  };

  ApiError.server_error = function (error) {
    if( error.status ) {
      return error.status >= this.http_statuses.internal_server_error;  
    }

    return error == 'Internal Server Error' || error >= this.http_statuses.internal_server_error;
  };

  ApiError.unauthorized = function (error) {
    if( error.status ) {
      return error.status === this.http_statuses.unauthorized;
    }

    return error == 'Unauthorized' || error === this.http_statuses.unauthorized;
  }

  return ApiError;

}]);