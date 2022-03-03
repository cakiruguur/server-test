class Service {
  constructor(model) {
    this.model = model;
  }

  list() {
    return this.model.find({});
  }

  findById(id) {
    return this.model.findById(id);
  }

  insert(data) {
    return new this.model(data).save();
  }

  destroy(id) {
    return this.model.findByIdAndDelete(id);
  }
}

module.exports = Service;
