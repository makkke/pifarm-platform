'use strict';

pifarmApp
  .factory('ApiErrorSvc', [function () {

    var ApiError = {
      // http status codes
      Ok: 200,
      Created: 201,

      BadRequest: 400,
      Unauthorized: 401,
      NotFound: 404,
      NotAcceptable: 406,
      UnprocessableEntity: 422,

      InternalServerError: 500,
      BadGateway: 502,
      ServiceUnavailable: 503,

      // custom error codes
      AccountInvalidCredentials:  'account_invalid_credentials',
      AccountAlreadyExists:       'account_already_exists',
      AccountValidationFailed:    'account_validation_failed',

      SessionInvalid:             'session_invalid',
      SessionNotProvided:         'session_not_provided',
    };

    ApiError.server_error = function (status) {
      return status >= this.InternalServerError;
    }

    return ApiError;

  }]);