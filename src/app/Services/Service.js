class Service {
  constructor(model) {
    /**@private*/ this.model = model;
  }

  list() {
    return this.model.find({});
  }

  findById(id) {
    return this.model.findById(id);
  }

  findOne(where) {
    return this.model.findOne(where);
  }

  insert(data) {
    return new this.model(data).save();
  }

  update(where, data) {
    return this.model.findOneAndUpdate(where, data, { new: true });
  }

  destroy(id) {
    return this.model.findByIdAndDelete(id);
  }
}

module.exports = Service;
