class user {   
    async getUserDetail(user_id) {
      return await SQLManager.findOne("user", { user_id: user_id });
    }
  
    async getUserList(whereClause) {
      return await SQLManager.find("user", whereClause);
    }
  
    async updateUser(whereClause, updateData) {
      return await SQLManager.update("user", whereClause, updateData);
    }
  
    async createUser(userObj) {
      return await SQLManager.insert("user", userObj);
    }
  
    async getCustomUserData(gender) {
      return await SQLManager.doExecuteRawQuery(`SELECT * FROM user WHERE gender = :gender`, { gender: gender });
    }

    async insertOtpData(userObj) {
      return await SQLManager.insert("otp_transaction", userObj);   
    }

    async getOtpData(whereClause, returnFields) {
      return await SQLManager.findOne("otp_transaction", whereClause, {}, returnFields);
    }
  }
  
  module.exports = user;