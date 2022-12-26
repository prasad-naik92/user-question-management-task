
class QuestionListInitalize extends baseInitialize {

  constructor() {
    super();
    this.initializer =  {};
    this.initializer.isSecured = false; // values: true/false
    this.initializer.requestMethod = ['GET']; // requestMethod: ['GET', 'POST', 'PUT', 'DELETE']
  }

  getParameter() {
    const param = {
      "limit": {
        "name": "limit",
        "type": "string",
        "description": "limit",
        "required": true,
        "default": "10"
      },
      "pageNumber": {
        "name": "page_number",
        "type": "string",
        "description": "page number",
        "required": true,
        "default": ""
      },
    };

    return { ...param };
  }
}

module.exports = QuestionListInitalize;