const bcrypt = require("bcryptjs");
class UserLoginAction extends baseAction {

  async executeMethod() {
    try {
      let { type, emailId, password } = this;

      const [userLib] = AutoLoad.loadLibray("sqlLib", ["user"]);

       /*<--------------------  Check login type -------------------->*/  
      if (type != GLB.USER_TYPE.EMAIL) {
        this.setResponse("INVALID_USER_TYPE");
        return {};
      }

      // email id and password is required for email login
      if (type == GLB.USER_TYPE.EMAIL) {
        if (!emailId || !password) {
          this.setResponse("EMAILID_PASSWORD_REQUIRED");
          return {};
        }
        // check if user exists
        let userDetails = await userLib.checkUserExistsForEmail({
          email_id: emailId,
          status: GLB.ACTIVE,
        });
        console.log(userDetails)
        if (!userDetails) {
          this.setResponse("USER_NOT_FOUND");
          return {};
        }

        // check user password
        if (!bcrypt.compareSync(password, userDetails.password)) {
          this.setResponse("WRONG_PASSWORD");
          return {};
        }

        this.setResponse('SUCCESS');
        return {
          user_id: userDetails.user_id,
          user_name: userDetails.user_name ? userDetails.user_name : "",
          access_token: userDetails.access_token ? userDetails.access_token : "",
        };

      }
    } catch (error) {
      console.log("user.login error: ", error);
    }
  };

}
module.exports = UserLoginAction;