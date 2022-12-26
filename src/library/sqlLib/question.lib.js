class question {
  async getQuestionDetail(question_id) {
    return await SQLManager.findOne("question", { question_id: question_id });
  }

  async getQuestionList(whereClause) {
    return await SQLManager.find("question", whereClause);
  }

  async updateQuestion(whereClause, updateData) {
    return await SQLManager.update("question", whereClause, updateData);
  }

  async createQuestion(questionObj) {
    return await SQLManager.insert("question", questionObj);
  }

  async getCustomQuestionData(gender) {
    return await SQLManager.doExecuteRawQuery(`SELECT * FROM question WHERE gender = :gender`, { gender: gender });
  }

  async insertQuestionData(userObj) {
    return await SQLManager.insert("question", userObj);
  }

  async createOption(questionObj) {
    return await SQLManager.insert("option", questionObj);
  }

  async getQuestionsList(whereClause, returnFields) {
    return await SQLManager.find("question", whereClause, {}, returnFields);
  }

  async getQuestionListByLimit(limit, offset) {
    const result = await SQLManager.doExecuteRawQuery(`
      SELECT *
      FROM question
      LIMIT ${limit}
      OFFSET ${offset}
      `);
    return result[0];
  }
}

module.exports = question;