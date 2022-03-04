const ProjectService = require("@Services/ProjectService")
const UserModel = require("@Models/UserModel");
const Service = require("./Service");

class UserService extends Service {
  model = UserModel;

  constructor(model) {
    super(model);
  }

  login(loginData) {
    return this.model.findOne(loginData);
  }

  resetPassword(email, data) {
    return this.model.findOneAndUpdate({ email: email }, { password: data },{ new : true});
  }

  projectList(user_id){
    return ProjectService.list({user : user_id})
  }
}

module.exports = new UserService();