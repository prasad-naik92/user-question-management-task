class user {
  async getUserDetail(user_id) {
    return await SQLManager.findOne("user", { user_id: user_id });
  }

  async getUserDetailByEmailAndPassword(whereClause) {
    return await SQLManager.findOne("user", whereClause);
  }

  async getUserData(whereClause, returnFields) {
    return await SQLManager.findOne("user", whereClause, {}, returnFields);
  }

  async getUserList(whereClause) {
    return await SQLManager.find("user", whereClause);
  }

  async updateOtp(whereClause, updateData) {
    return await SQLManager.update("otp_transaction", whereClause, updateData);
  }

  async updateUserDetail(whereClause, updateData) {
    return await SQLManager.update("user", whereClause, updateData);
  }

  async createUser(userObj) {
    return await SQLManager.insert("user", userObj);
  }

  async getCustomUserData(gender) {
    return await SQLManager.doExecuteRawQuery(`SELECT * FROM user WHERE email_id = :gender `, { emailId: emailId });
  }

  async insertOtpData(userObj) {
    return await SQLManager.insert("otp_transaction", userObj);
  }

  async getOtpData(whereClause, returnFields) {
    return await SQLManager.findOne("otp_transaction", whereClause, {}, returnFields);
  }

  async getRecentOtpData(emailId, otp) {
    return (
      await SQLManager.doExecuteRawQuery(`SELECT * FROM otp_transaction WHERE email_id = :emailId AND status=${GLB.ACTIVE} ORDER BY otp_transaction_id DESC LIMIT 1`, { emailId: emailId })
    )[0];
  }

  async checkUserExistsForEmail(emailId) {
    return await SQLManager.findOne("user", { email_id: emailId });

  }

}

module.exports = user;