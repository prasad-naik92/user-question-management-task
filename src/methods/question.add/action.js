const { MAX_QUESTIONS } = require("../../global/constants");

class QuestionAddAction extends baseAction {

  async executeMethod() {
    let { questionTitle, questionDescription, difficultyLevel,optionOne, optionTwo, optionThree, optionfour } = this;

    //variable section
    const [questionLib] = AutoLoad.loadLibray("sqlLib", ["question"]);

    const data = {
      //type: GLB.USER_TYPE.EMAIL,
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
    let questionId = await questionLib.insertQuestionData(data);

    this.setResponse('SUCCESS');
    return { 'question_id': questionId};
  };

}
module.exports = QuestionAddAction;