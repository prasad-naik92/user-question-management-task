
class UserVerifyInitalize extends baseInitialize {

  constructor() {
    super();
    this.initializer =  {};
    this.initializer.isSecured = false; // values: true/false
    this.initializer.requestMethod = ['GET']; // requestMethod: ['GET', 'POST', 'PUT', 'DELETE']
  }

  getParameter() {
    const param = {
      otp: {
        name: "otp",
        type: "string",
        description: "otp",
        required: true,
        default: "",
      },
      emailId: {
        name: "email_id",
        type: "string",
        description: "email id",
        required: true,
        default: "",
      }
    };

    return { ...param };
  }
}

module.exports = UserVerifyInitalize;