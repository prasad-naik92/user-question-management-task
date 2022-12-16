//Auto Loads

// FEEDBACK: preferably use "bcryptjs"(https://www.npmjs.com/package/bcryptjs) package instead of "bcrypt"
const bcrypt = require('bcrypt');
const [userLib] = AutoLoad.loadLibray("sqlLib", ["user"]);    // import libraries within executeMethod's try block

class UserRegisterAction extends baseAction {

  async executeMethod() {
    try {
      let { userName, emailId, password } = this;

      //variable section
      let responseData;

      /*
      FEEDBACK:
        BELOW CONDITION NOT NEEDED: njs2 will handle required fields if "required" field is set to true in init.js file
      */
      if (!emailId || !password) {
        this.setResponse("EMAILID_PASSWORD_REQUIRED");
        return {};
      }

      /*-------------------- OTP GENERATION --------------------*/
      var otp = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
      /*
      FEEDBACK:
        1. Always use "let" or "const" keyword. Never use "var" to declare a variable
        2. let timestamp = Date.now()
           This gives timestamp in milliseconds (commonly used in nodejs)
      */
      var timestamp = Math.floor((new Date(new Date().getTime() + (5 * 60 * 1000))) / 1000)

      const data = {
        //type: GLB.USER_TYPE.EMAIL,
        otp: otp ? otp : "",
        email_id: emailId,
        //password : password,
        expire_at: timestamp,
        // created_at: new Date(),
        status: GLB.ACTIVE,
      };

      console.log(data);
      /*<-------------------- INSERT OTP TRANSACTION -------------------->*/
      let otpData = await userLib.insertOtpData(data);

      const userData = {
        //type: GLB.USER_TYPE.EMAIL,
        access_token: "",
        user_name: userName,
        type: GLB.USER_TYPE.EMAIL,
        email_id: emailId,
        // FEEDBACK: encrypt password before storing
        // password: bcrypt.hashSync(password, 10);
        password: password,
        //expire_at	: timestamp,
        created_at: new Date(),
        status: GLB.PENDING,
      };

      let userDetails = await userLib.getUserData({
        email_id: emailId,
        password: password,
      });
      console.log(userDetails);
    /*<-------------------- INSERT USER IF USERNAME AND PASSWORD NOT MATCHES-------------------->*/
      if (!userDetails) {
        let userId = await userLib.createUser(userData);
      }

      responseData = {
        otp: otp,
      };

      this.setResponse('SUCCESS');
      return responseData;

    } catch(error) {
      // log error for debuging purpose
      console.log("user.register error: ", error);
    }
  };

}
module.exports = UserRegisterAction;