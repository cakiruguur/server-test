const Mongoose = require("mongoose");
const projectLogger = require('@/scripts/logger/ProjectLogger');

const ProjectSchema = new Mongoose.Schema(
  {
    name: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

ProjectSchema.post('save',(doc) => {
  projectLogger.log({
    level : "info",
    message : doc
  })
})

module.exports = Mongoose.model("Project", ProjectSchema);
