const ProjectService = require("@Services/ProjectService");
const httpStatus = require("http-status");
const ApiError = require("../Errors/apiErrors");

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

  find(req, res, next) {
    ProjectService.findById(req.params.id)
      .then((project) => {
        if(!project) next(ApiError.notFoundWith('Proje'))
        res.status(httpStatus.OK).send(project);
      })
      .catch((err) => {
        next(ApiError.wrongID());
      });
  }

  create(req, res) {
    req.body.user = req.user;
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
