'use strict';

pinapleApp
  .factory('ApiErrorSvc', [function () {

    return {

      // custom error codes
      AccountInvalidCredentials:  'account_invalid_credentials',
      AccountAlreadyExists:       'account_already_exists',
      AccountValidationFailed:    'account_validation_failed',

      SessionInvalid:             'session_invalid',
      SessionNotProvided:         'session_not_provided',

      isServerError: function(status) {
        return status >= 500;
      },

    };

  }]);