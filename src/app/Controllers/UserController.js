const UserService = require("@Services/UserService");
const httpStatus = require("http-status");
const { passwordToHash } = require("@/utils/helpers/password");
const { generateAccessToken, generateRefreshToken } = require("@/utils/helpers/token");

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

  //@TODO: Proje bitince sil
  whoAmI(req, res) {
    return res.status(200).send(req.user);
  }
}

module.exports = new UserController();
