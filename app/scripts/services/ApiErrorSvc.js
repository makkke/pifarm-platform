'use strict';

angular.module('pifarmApp')
.factory('ApiErrorSvc', [function () {

  var ApiError = {
    // http status codes
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

    // custom error codes
    AccountInvalidCredentials:  'account_invalid_credentials',
    AccountAlreadyExists:       'account_already_exists',
    AccountValidationFailed:    'account_validation_failed',

    SessionInvalid:             'session_invalid',
    SessionNotProvided:         'session_not_provided',
  };

  ApiError.server_error = function (error) {
    if( error.status ) {
      return error.status >= this.internal_server_error;  
    }

    return error == 'Internal Server Error' || error >= this.internal_server_error;
  };

  ApiError.unauthorized = function (error) {
    if( error.status ) {
      return error.status === this.unauthorized;
    }

    return error == 'Unauthorized' || error === this.unauthorized;
  }

  return ApiError;

}]);