
class UserVerifyAction extends baseAction {

  async executeMethod() {
    let { emailId, otp } = this;
    //Auto loads
    const [userLib] = AutoLoad.loadLibray("sqlLib", ["user"]);

    //variable section
    let user, otpValidated, otpVerified;

    /*<-------------------- CHECK IF OTP AVAILABLE IN DB -------------------->*/
    user = await userLib.getRecentOtpData(emailId);

    if (Object.keys(user).length === 0) {
      this.setResponse("INVALID_OTP");
      return {};
    }

    /*<-------------------- VALIDATE OTP -------------------->*/
    if (user[0].otp != otp) {
      this.setResponse('OTP_NOT_MATCHED');
      return {};
    }

    /*<-------------------- UPDATE USER VERIFICATION SUCCESS IN DB  AND INACTIVE OTP-------------------->*/

    let userDetails = await userLib.getUserData({
      email_id: emailId,
    });

    userUpdated = await userLib.updateUserDetail(
      {
        user_id: userDetails.user_id,
      },
      {
        status: GLB.ACTIVE,
      }
    );

    otpInActivated = await userLib.updateOtp(
      {
        otp_transaction_id: user[0].otp_transaction_id,
      },
      {
        status: GLB.INACTIVE,
      }
    );

    this.setResponse('SUCCESS');
    return { message: "successfully OTP verified, please login" };

  };

}
module.exports = UserVerifyAction;