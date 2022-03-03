const ProjectModel = require("@Models/ProjectModel");
const Service = require("./Service");

class ProjectService extends Service {
  model = ProjectModel;

  constructor(model) {
    super(model);
  }
}

module.exports = new ProjectService();
