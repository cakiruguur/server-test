const UserService = require("@Services/UserService");
const httpStatus = require("http-status");
const { passwordToHash } = require("@/utils/helpers/password");
const { generateAccessToken, generateRefreshToken } = require("@/utils/helpers/token");
const eventEmitter = require("@/scripts/events/eventEmitter");
const uuid = require("uuid");

class UserController {
  index(req, res) {
    UserService.list()
      .then((response) => {
        res.status(httpStatus.OK).send(response);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  find(req, res) {
    UserService.findById(req.params.id)
      .then((response) => {
        if (response == null) return res.status(httpStatus.NOT_FOUND).send({ error: "Kullanıcı kaydı bulunamadı" });
        res.status(httpStatus.OK).send(response);
      })
      .catch((e) => {
        res.status(httpStatus.NOT_FOUND).send({ error: "ID Bilgisi doğru değil" });
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

  delete(req, res) {
    UserService.destroy(req.params.id)
      .then((response) => {
        if (response == null) return res.status(httpStatus.NOT_FOUND).send({ error: "Kullanıcı kaydı bulunamadı" });
        res.status(httpStatus.OK).send(response);
      })
      .catch((e) => {
        res.status(httpStatus.NOT_FOUND).send({ error: "ID Bilgisi doğru değil" });
      });
  }

  login(req, res) {
    //Hashlenmiş parolayı requeste atıyoruz
    req.body.password = passwordToHash(req.body.password);

    UserService.login(req.body)
      .then((user) => {
        // User var mı diye kontrol ediyoruz
        if (!user) return res.status(httpStatus.NOT_FOUND).send({ message: "Kullanıcı bilgileri yanlış" });

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
        res.send(err);
      });
  }

  resetPassword(req, res) {
    // Yeni şifrenin oluşturulması
    const uuid_pass = uuid.v4().split("-")[0];
    const changedPassword = passwordToHash(uuid_pass);

    //User Servisinden parola sıfırlama metodu
    UserService.resetPassword(req.body.email, changedPassword)
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

        // Kullanıcıyı bilgilendiriyoruz
        // res.status(httpStatus.OK).send({
        //   message: "Şifre sıfırlama işleminiz tamamlandı. Şifreniz mailinize gönderildi",
        // });
        res.status(httpStatus.OK).send(`Yeni şifre : ${uuid_pass}`);
      })
      .catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Şifre sıfırlama sırasında bir hata oluştu." });
      });
  }

  projectList(req, res) {
    UserService.projectList(req.user._id)
      .then((result) => {
        res.status(httpStatus.OK).send(result);
      })
      .catch((err) => {
        res.status(httpStatus.NOT_FOUND).send(err);
      });
  }
  //@TODO: Proje bitince sil
  whoAmI(req, res) {
    return res.status(200).send(req.user);
  }
}

module.exports = new UserController();
