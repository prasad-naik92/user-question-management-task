
class UserRegisterInitalize extends baseInitialize {

  constructor() {
    super();
    this.initializer =  {};
    this.initializer.isSecured = false; // values: true/false
    this.initializer.requestMethod = ['GET']; // requestMethod: ['GET', 'POST', 'PUT', 'DELETE']
  }

  getParameter() {
    const param = {
      "userName": {
        "name": "user_name",
        "type": "string",
        "description": "user name",
        "required": false,
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
        "description": "password",
        "required": true,
        "default": ""
      }
    };

    return { ...param };
  }
}

module.exports = UserRegisterInitalize;