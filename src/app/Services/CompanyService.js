const Company = require("@Models/CompanyModel");
const Service = require("./Service");

class CompanyService extends Service {
  constructor() {
    super(Company);
  }

  list(where) {
    return Company.find(where || {}).populate({
      path : "user",
      select : "name email"
    });
  }
}

module.exports = new CompanyService();
