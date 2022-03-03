const Mongoose = require("mongoose");

const ProjectSchema = new Mongoose.Schema(
  {
    name: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = Mongoose.model("Project", ProjectSchema);
