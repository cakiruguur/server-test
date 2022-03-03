const ProjectService = require("@Services/ProjectService");
const httpStatus = require("http-status");

class ProjectController {
  index(req, res) {
    ProjectService.list()
      .then((response) => {
        res.status(httpStatus.OK).send(response);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  find(req, res) {
    ProjectService.findById(req.params.id)
      .then((response) => {
        res.status(httpStatus.OK).send(response);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  create(req, res) {
    ProjectService.insert(req.body)
      .then((response) => {
        res.status(httpStatus.CREATED).send(response);
      })
      .catch((e) => {
        res.send(e);
      });
  }

  delete(req, res) {
    ProjectService.destroy(req.params.id)
      .then((response) => {
        res.status(httpStatus.OK).send(response);
      })
      .catch((err) => {
        res.send(e);
      });
  }
}

module.exports = new ProjectController();
