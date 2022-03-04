const ProjectModel = require("@Models/ProjectModel");
const Service = require("./Service");

class ProjectService extends Service {
  model = ProjectModel;

  constructor(model) {
    super(model);
  }

  list(where) {
    return this.model.find(where || {}).populate({
      path: "user",
      select: "name email",
    });
  }
}

module.exports = new ProjectService();
