const { MAX_QUESTIONS } = require("../../global/constants");

class QuestionAddAction extends baseAction {

  async executeMethod() {

    try {
      let { questionTitle, questionDescription, difficultyLevel, optionOne, optionTwo, optionThree, optionfour,userObj } = this;
     
       /*-------------------- IMPORTING LIBRARY ----------------------*/
      const [questionLib] = AutoLoad.loadLibray("sqlLib", ["question"]);

      const data = {
        question_title: questionTitle ? questionTitle : "",
        question_description: questionDescription,
        difficulty_level: difficultyLevel,
        option_one: optionOne,
        option_two: optionTwo,
        option_three: optionThree,
        option_four: optionfour,
        status: GLB.ACTIVE,
      };

      /*<-------------------- INSERT QUESTION DATA-------------------->*/
      const questionId = await questionLib.insertQuestionData(data);

      this.setResponse('SUCCESS');
      return { 'question_id': questionId };
    } catch (error) {
      console.log("user.login error: ", error);
    }
  };

}
module.exports = QuestionAddAction;