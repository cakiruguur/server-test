const UserService = require("@Services/UserService");
const httpStatus = require("http-status");
const { passwordToHash } = require("@/utils/helpers/password");
const { generateAccessToken, generateRefreshToken } = require("@/utils/helpers/token");
const eventEmitter = require("@/scripts/events/eventEmitter");
const uuid = require("uuid");
const ApiError = require("../Errors/apiErrors");
const fileUpload = require("../../utils/helpers/fileUpload");

class UserController {
  index(req, res) {
    UserService.list()
      .then((users) => {
        res.status(httpStatus.OK).send(users);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  find(req, res, next) {
    UserService.findById(req.params.id)
      .then((user) => {
        if (!user) return next(ApiError.notFoundWith("Kullanıcı"));
        res.status(httpStatus.OK).send(user);
      })
      .catch((e) => {
        next(ApiError.wrongID());
      });
  }

  create(req, res) {
    req.body.password = passwordToHash(req.body.password);
    UserService.insert(req.body)
      .then((response) => {
        res.status(httpStatus.CREATED).send(response);
      })
      .catch((e) => {
        res.status(httpStatus.BAD_REQUEST).send(e);
      });
  }

  delete(req, res, next) {
    UserService.destroy(req.params.id)
      .then((user) => {
        if (!user) return next(ApiError.notFoundWith("Kullanıcı"));
        res.status(httpStatus.OK).send(user);
      })
      .catch((e) => {
        next(ApiError.wrongID());
      });
  }

  login(req, res) {
    //Hashlenmiş parolayı requeste atıyoruz
    req.body.password = passwordToHash(req.body.password);
    UserService.findOne({ email: req.body.email })
      .then((user) => {
        // User var mı kontrolü
        if (!user) return res.status(httpStatus.NOT_FOUND).send({ message: "Böyle bir kullanıcı bulunmamaktadır." });

        // Kullanıcının parolası doğru mu kontrolü
        if (user.password !== req.body.password) return res.status(httpStatus.UNAUTHORIZED).send({ message: "Kullanıcı parolası yanlış" });

        // User objesini manipüle ediyoruz
        user = {
          ...user.toObject(),
          tokens: {
            access_token: generateAccessToken(user),
            refresh_token: generateRefreshToken(user),
          },
        };
        delete user.password;
        res.status(httpStatus.OK).send(user);
      })
      .catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Kullanıcı girişi sırasında bir hata oluştu" });
      });
  }

  resetPassword(req, res) {
    // Yeni şifrenin oluşturulması
    const uuid_pass = uuid.v4().split("-")[0];
    const changedPassword = passwordToHash(uuid_pass);

    //User Servisinden parola sıfırlama metodu
    UserService.update({ email: req.body.email }, { password: changedPassword })
      .then((updatedUser) => {
        // Kullanıcı var mı kontrolü
        if (!updatedUser) return res.status(httpStatus.NOT_FOUND).send({ message: "Kullanıcı bulunamadı" });

        /* @TODO Email işlemini proje bitince aç */

        //Event Emitter ile mail gönderme işlemi
        // eventEmitter.emit("send_email", {
        //   to: req.body.email,
        //   subject: "Şifre Sıfırlama",
        //   html: `Sıfırlanan şifreniz <b>${uuid_pass}</b>. <br /> İyi günler dileriz.`,
        // });

        // // Kullanıcıyı bilgilendiriyoruz
        // res.status(httpStatus.OK).send({
        //   message: "Şifre sıfırlama işleminiz tamamlandı. Şifreniz mailinize gönderildi",
        // });
        res.status(httpStatus.OK).send(`Yeni şifre : ${uuid_pass}`);
      })
      .catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Şifre sıfırlama sırasında bir hata oluştu." });
      });
  }

  async profilePhoto(req, res) {
    const user = req.user

    if(!user) throw ApiError.notFoundWith("Kullanıcı")

    const uploaded = await fileUpload({
      file: req.files?.profile_photo,
      uploadName: user?._id,
      path: "profile",
    });

    const updatedUser = await UserService.update({ email: user.email }, { profile_photo: uploaded });

    res.status(httpStatus.OK).send({ 
      message: "Dosya yükleme işleminiz başarıyla tamamlandı", 
      profile_photo: updatedUser.profile_photo
    });
  }

  //@TODO: Proje bitince sil
  whoAmI(req, res) {
    return res.status(200).send(req.user);
  }
}

module.exports = new UserController();
