//Auto Loads

// FEEDBACK: preferably use "bcryptjs"(https://www.npmjs.com/package/bcryptjs) package instead of "bcrypt"
const bcrypt = require('bcrypt');
const [userLib] = AutoLoad.loadLibray("sqlLib", ["user"]);    // import libraries within executeMethod's try block

class UserRegisterAction extends baseAction {

  async executeMethod() {
    try {
      let { userName, emailId, password } = this;

      //variable section
      let responseData; // FEEDBACK: Never have a vairable that doesnt have initialization!

      /*
      FEEDBACK:
        BELOW CONDITION NOT NEEDED: njs2 will handle required fields if "required" field is set to true in init.js file
      */
      if (!emailId || !password) {
        this.setResponse("EMAILID_PASSWORD_REQUIRED"); // FEEDBACK: It is not a good practice to combine multiple error messages into 1! Seperate them.
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
        otp: otp ? otp : "", // FEEDBACK: this logical line is dead code i think! your otp variable will always have a value. So why the check?
        email_id: emailId,
        //password : password, // FEEDBACK: Do 
        expire_at: timestamp,
        // created_at: new Date(),
        status: GLB.ACTIVE,
      };

      console.log(data);
      /*<-------------------- INSERT OTP TRANSACTION -------------------->*/
      let otpData = await userLib.insertOtpData(data); // FEEDBACK: use const for varibales that wouldnt change!

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
      console.log(userDetails); // FEEDBACK: DO NOT LEAVE BEHING debug log messages especicaly console.log messages!
    /*<-------------------- INSERT USER IF USERNAME AND PASSWORD NOT MATCHES-------------------->*/
      if (!userDetails) {
        let userId = await userLib.createUser(userData); // FEEDBACK: Do not have UNUSED VARIABLES! If you really want it, please use an underscore
        // let _ =  await userLib.createUser(userData); // This way other DEV will not be using the variables by mistake
      }

      responseData = {
        otp: otp, // FEEDBACK: you do not have to say otp: otp! if the key is same as the variable, then only variable is enough.
      };

      this.setResponse('SUCCESS');
      return responseData;

    } catch(error) {
      // log error for debuging purpose
      console.log("user.register error: ", error); // FEEDBACK: Use the proper log message. if it is an error it should be console.error!
      // FEEDBACK: there is nothing being set as error or nothing being returned back to the caller in the catch block!
      // It is not a good practice to silently exit!
      // Suggest you to make a new Error Message Code for each API. That way we know which API crashed
      // Also it it suits you, please Throw the error here. Which will be caught by the Framework method which calls this execute method.
      // The Framework method would then exit gracefully
    }
  };

}
module.exports = UserRegisterAction;
