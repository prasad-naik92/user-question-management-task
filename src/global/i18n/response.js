const RESPONSE = {
  INVALID_USER: {
    responseCode: 1001, responseMessage: {
      "en": "Invalid user data"
    },
  }, INVALID_OTP: {
    responseCode: 1002, responseMessage: {
      "en": "Please Enter valid OTP"
    }
  }, OTP_NOT_MATCHED: {
    responseCode: 1003, responseMessage: {
      "en": "Oops looks like OTP not matching  , please register again"
    }
  }, INVALID_USER_TYPE: {
    responseCode: 1004, responseMessage: {
      "en": "Invalid user type"
    }
  }, EMAILID_PASSWORD_REQUIRED: {
    responseCode: 1005, responseMessage: {
      "en": "Invalid user type"
    }
  },USER_NOT_FOUND: {
    responseCode: 1006, responseMessage: {
      "en": "user not found for the credentials"
    }
  },USER_OTP_ALREADY_VERIFIED: {
    responseCode: 1007, responseMessage: {
      "en": "user otp already verified, please login"
    }
  },WRONG_PASSWORD: {
    responseCode: 1008, responseMessage: {
      "en": "Oops, Entered wrong password."
    }
  },
};

module.exports.RESPONSE = RESPONSE;

