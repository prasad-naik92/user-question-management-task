
const bcrypt = require("bcryptjs");
class UserRegisterAction extends baseAction {

  async executeMethod() {
    try {
      let { userName, emailId, password } = this;

      /*-------------------- IMPORTING USER LIBRARY ----------------------*/
      const [userLib] = AutoLoad.loadLibray("sqlLib", ["user"]);

      /*-------------------- OTP GENERATION ------------------------------*/
      const otp = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
      let timestamp = Date.now();
      const hashedPassword = bcrypt.hashSync(password, 10);

      const data = {
        otp: otp,
        email_id: emailId,
        password: hashedPassword, 
        expire_at: timestamp,
        status: GLB.ACTIVE,
      };

      /*<-------------------- INSERT OTP TRANSACTION -------------------->*/
      await userLib.insertOtpData(data); 

      const userData = {
        type: GLB.USER_TYPE.EMAIL,
        user_name: userName,
        type: GLB.USER_TYPE.EMAIL,
        email_id: emailId,
        password: hashedPassword,
        status: GLB.PENDING,
      };

      let userDetails = await userLib.getUserData({
        email_id: emailId,
      });

      /*<-------------------- INSERT USER IF EMAIL NOT MATCHES-------------------->*/
      if (!userDetails) {
        await userLib.createUser(userData);
      }

      let responseData = {
        'otp': otp
      };

      this.setResponse('SUCCESS');
      return responseData;

    } catch (error) {
      console.log("user.register error: ", error);
    }
  };

}
module.exports = UserRegisterAction;
