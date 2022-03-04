const Mongoose = require("mongoose");
const UserLogger = require('@/scripts/logger/UserLogger');

const UserSchema = new Mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: String,
    profile_photo: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// @INFO: Kayıt bittikten sonra loglama
UserSchema.post('save',(doc) => {
  UserLogger.log({
    level : "info",
    message : doc
  })
})

// @INFO: Email unique kontrolü
UserSchema.path("email").validate(async (email) => {
  const exists = await Mongoose.models.User.countDocuments({ email: email });
  return !exists;
}, "Email adresiyle daha önce kayıt yapılmış..");

module.exports = Mongoose.model("user", UserSchema);
