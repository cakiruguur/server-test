const ProjectService = require("@Services/ProjectService");
const UserModel = require("@Models/UserModel");
const Service = require("./Service");

class UserService extends Service {
  constructor() {
    super(UserModel);
  }

  projectList(user_id) {
    return ProjectService.list({ user: user_id });
  }
}

module.exports = new UserService();
