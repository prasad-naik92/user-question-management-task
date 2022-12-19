
class UserLoginInitalize extends baseInitialize {

  constructor() {
    super();
    this.initializer =  {};
    this.initializer.isSecured = false; // values: true/false
    this.initializer.requestMethod = ['GET']; // requestMethod: ['GET', 'POST', 'PUT', 'DELETE']
  }

  getParameter() {
    const param = {
      "type": {
        "name": "type",
        "type": "number",
        "description": "1-Email;",
        "required": true,
        "default": ""
      },
      "emailId": {
        "name": "email_id",
        "type": "string",
        "description": "email id",
        "required": true,
        "default": ""
      },
      "password": {
        "name": "password",
        "type": "string",
        "description": "",
        "required": true,
        "default": ""
      },
    };

    return { ...param };
  }
}

module.exports = UserLoginInitalize;