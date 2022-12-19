
class UserVerifyAction extends baseAction {

  async executeMethod() {
    try {
      let { emailId, otp } = this;
       /*<-------------------- IMPORTING USER LIBRARY -------------------->*/
      const [userLib] = AutoLoad.loadLibray("sqlLib", ["user"]);

      /*<-------------------- CHECK IF OTP AVAILABLE IN DB -------------------->*/
      let otpData = await userLib.getRecentOtpData(emailId);

      if (Object.keys(otpData).length === 0) {
        this.setResponse("INVALID_OTP");
        return {};
      }

       /*<-------------------- CHECK IF USER ALREADY OTP VERIFIED OR NOT -------------------->*/
      if (otpData[0].status === GLB.INACTIVE) {
        this.setResponse("USER_OTP_ALREADY_VERIFIED");
        return {};
      }
    
      /*<-------------------- VALIDATE OTP -------------------->*/
      if (otpData[0].otp != otp) {
        this.setResponse('OTP_NOT_MATCHED');
        return {};
      }

      /*<-------------------- UPDATE USER VERIFICATION SUCCESS IN DB  AND INACTIVE OTP-------------------->*/

      let userDetails = await userLib.getUserData({
        email_id: emailId,
      });

      await userLib.updateUserDetail(
        {
          user_id: userDetails.user_id,
        },
        {
          status: GLB.ACTIVE,
        }
      );

      await userLib.updateOtp(
        {
          otp_transaction_id: otpData[0].otp_transaction_id,
        },
        {
          status: GLB.INACTIVE,
        }
      );

      this.setResponse('SUCCESS');
      return { "message": "successfully OTP verified, please login" };
    } catch (error) {
      console.log("user.verify error", error)
    }
  };

}
module.exports = UserVerifyAction;