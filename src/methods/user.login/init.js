
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
      "userName": {
        "name": "user_naame",
        "type": "string",
        "description": "",
        "required": false,
        "default": ""
      },
      "emailId": {
        "name": "email_id",
        "type": "string",
        "description": "email id",
        "required": false,
        "default": ""
      },
      "password": {
        "name": "password",
        "type": "string",
        "description": "",
        "required": false,
        "default": ""
      },
    };

    return { ...param };
  }
}

module.exports = UserLoginInitalize;