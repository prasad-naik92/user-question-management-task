
class QuestionAddInitalize extends baseInitialize {

  constructor() {
    super();
    this.initializer = {};
    this.initializer.isSecured = true; // values: true/false
    this.initializer.requestMethod = ['GET']; // requestMethod: ['GET', 'POST', 'PUT', 'DELETE']
  }

  getParameter() {
    const param = {
      "questionTitle": {
        "name": "question_title",
        "type": "string",
        "description": "question title",
        "required": true,
        "default": ""
      },
      "questionDescription": {
        "name": "question_description",
        "type": "string",
        "description": "question description",
        "required": true,
        "default": ""
      },
      "optionOne": {
        "name": "option_one",
        "type": "string",
        "description": "provide option one",
        "required": true,
        "default": ""
      }, 
      "optionTwo": {
        "name": "option_two",
        "type": "string",
        "description": "provide option two",
        "required": true,
        "default": ""
      },
      "optionThree": {
        "name": "option_three",
        "type": "string",
        "description": "provide option three",
        "required": true,
        "default": ""
      },
      "optionfour": {
        "name": "option_four",
        "type": "string",
        "description": "provide option four",
        "required": true,
        "default": ""
      },
      "difficultyLevel": {
        "name": "difficulty_level",
        "type": "number",
        "description": "difficulty level",
        "required": true,
        "default": ""
      },
    };

    return { ...param };
  }
}

module.exports = QuestionAddInitalize;