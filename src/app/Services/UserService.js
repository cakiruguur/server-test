const UserModel = require("@Models/UserModel");
const Service = require("./Service");

class UserService extends Service {
  model = UserModel;

  constructor(model) {
    super(model);
  }

  login(loginData){
    return this.model.findOne(loginData)
  }
}

module.exports = new UserService();
