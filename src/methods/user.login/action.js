
class UserLoginAction extends baseAction {

  async executeMethod() {
    let { type, userName, emailId, password } = this;

    const [userLib] = AutoLoad.loadLibray("sqlLib", ["user"]);

    // Check login type
    if (type < 1 || type > 1) {
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
      console.log("aaa123aaa")
      let userDetails = await userLib.getUserData({
        email_id: emailId,
        status: GLB.ACTIVE,
      });
      console.log(userDetails)
      if (!userDetails) {
        this.setResponse("USER_NOT_FOUND");
        return {};
      }

      this.setResponse('SUCCESS');
      return { 
        user_id: userDetails.user_id, 
        user_name: userDetails.user_name ? userDetails.user_name : "",
        access_token: userDetails.access_token? userDetails.access_token : "",
      };

    }
  };

}
module.exports = UserLoginAction;