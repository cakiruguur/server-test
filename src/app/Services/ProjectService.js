const ProjectModel = require("@Models/ProjectModel");
const Service = require("./Service");

class ProjectService extends Service {

  constructor() {
    super(ProjectModel);
  }

  list(where) {
    return this.model.find(where || {}).populate({
      path: "user",
      select: "name email",
    });
  }
}

module.exports = new ProjectService();
