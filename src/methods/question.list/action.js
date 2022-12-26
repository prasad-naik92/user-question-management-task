
class QuestionListAction extends baseAction {

  async executeMethod() {
    try {
      let { limit, pageNumber } = this;

      /*-------------------- IMPORTING QUESTION LIBRARY ----------------------*/
      const [questionLib] = AutoLoad.loadLibray("sqlLib", ["question"]);

      pageNumber = (pageNumber && pageNumber > 1) ? pageNumber : 1;
      let offset = (pageNumber - 1) * limit;
      /*-------------------- GETTING QUESTION LIST DEPENDS ON LIMIT AND PAGENUMBER ----------------------*/
      let questionsList = await questionLib.getQuestionListByLimit(limit, offset);

       /*-------------------- RESPONSE SECTION ----------------------*/
      let questionData = questionsList.map((question) => {
        let options = { 'option_one': question.option_one, 'option_two': question.option_two, 'option_three': question.option_three, 'option_four': question.option_four };

        return {
          question_id: question.question_id,
          question_title: question.question_title,
          question_description: question.question_description,
          option_data: [options]
        };
      })

      this.setResponse('SUCCESS');
      return { 'question_list': questionData };
    } catch (error) {
      console.log("question.list error: ", error);

    }
  };

}
module.exports = QuestionListAction;