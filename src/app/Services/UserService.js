const UserModel = require("@Models/UserModel");
const Service = require("./Service");

class UserService extends Service {
  constructor() {
    super(UserModel);
  }
}

module.exports = new UserService();
