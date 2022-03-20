const Mongoose = require("mongoose");
// const UserLogger = require("@/scripts/logger/UserLogger");

const CompanySchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    logo: String,
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    web: String,
    sgk_no: {
      type: String,
      required: true,
      minlength: 24,
    },
    is_kolu: String,
    tehlike: Number,
    isg_time: Number,
    hekim_time: Number,
    dsp_time: Number,
    official: {
      type: String,
      required: true,
    },
    official_phone: {
      type: Number,
      required: true,
    },
    user: {
      type: Mongoose.Types.ObjectId,
      ref: "user",
    },
    isg_uzman: {
      type: Mongoose.Types.ObjectId,
      ref: "isg_uzman",
    },
    doctor: {
      type: Mongoose.Types.ObjectId,
      ref: "doctor",
    },
    dsp: {
      type: Mongoose.Types.ObjectId,
      ref: "dsp",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

CompanySchema.path("sgk_no").validate(async (sgk_no) => {
  const exists = await Mongoose.models.company.countDocuments({ sgk_no: sgk_no });
  if (exists === 1) {
    return false
  }
});
// @INFO: Kayıt bittikten sonra loglama
// UserSchema.post("save", (doc) => {
//   UserLogger.log({
//     level: "info",
//     message: doc,
//   });
// });

module.exports = Mongoose.model("company", CompanySchema);
