const CompanyService = require("@Services/CompanyService");
const httpStatus = require("http-status");
const ApiError = require("../Errors/apiErrors");

class CompanyController {
  index(req, res) {
    CompanyService.list()
      .then((companies) => {
        res.status(httpStatus.OK).send(companies);
      })
      .catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
      });
  }

  find(req, res, next) {
    CompanyService.findById(req.params.id)
      .then((company) => {
        if (!company) return next(ApiError.notFoundWith("Şirket"));
        res.status(httpStatus.OK).send(company);
      })
      .catch((err) => {
        next(ApiError.wrongID());
      });
  }

  create(req, res, next) {
    req.body.user = req.user;
    CompanyService.insert(req.body)
      .then((company) => {
        res.status(httpStatus.CREATED).send(company);
      })
      .catch((err) => {
        next(new ApiError(`${err.errors.sgk_no.value} - bu sgk numarası başka bir şirkete kayıtlıdır.`, httpStatus.BAD_REQUEST));
      });
  }

  update(req, res, next) {
    CompanyService.update({ _id: req.params.id }, req.body)
      .then((updatedCompany) => {
        if (!updatedCompany) return next(ApiError.notFoundWith("Şirket"));
        res.status(httpStatus.OK).send(updatedCompany);
      })
      .catch((err) => {
        next(ApiError.wrongID());
      });
  }

  delete(req, res, next) {
    CompanyService.destroy(req.params.id)
      .then((deleted) => {
        if (!deleted) return next(ApiError.notFoundWith("Şirket"));
        res.status(httpStatus.OK).send({
          message : `${deleted._id} id numaralı şirket silinmiştir`,
          original : deleted
        });
      })
      .catch((err) => {
        next(ApiError.wrongID());
      });
  }
}

module.exports = new CompanyController();
