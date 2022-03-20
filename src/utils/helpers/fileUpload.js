const path = require("path");
const fs = require("fs");
const ApiError = require("../../app/Errors/apiErrors");

module.exports = (opt) => {
  // @TODO: Dosya yükleme işlemlerini geliştir
  const options = {
    uploadName: "default",
    path: "",
    allowed: [],
    ...opt,
  };

  return new Promise((resolve, reject) => {
    // Gelen dosya
    const file = options?.file;
    // Dosya yoksa hata veriyor
    if (!file) return reject(new ApiError("Bu dosya türüne izin verilmiyor", 404));
    // Dosya uzantısını alıyoruz
    const fileExt = path.extname(file.name).split(".")[1];
    // İzin verilen türler kontrolü : Eğer array boş ise her türü kabul eder
    const allowed = options.allowed.length === 0 ? false : !options.allowed.includes(fileExt);
    // Dosya türü hatası
    if (allowed) return reject(new ApiError("Bu dosya türüne izin verilmiyor", 401));
    // Server'a kaydedileceği isim
    const uploadName = `${options?.uploadName}_${new Date().getTime()}.${fileExt}`;
    // Yolu belirliyoruz
    const filePath = path.join(__dirname, `../../uploads/${options?.path}`);

    if (options.path === "profile") {
      // Profile klasörü dosya listeleme
      fs.readdir(filePath, (err, files) => {
        if (err) return reject(new ApiError(err));
        // User profil fotoğrafı bulma
        files.find((file) => {
          if (file.split("_")[0] === options?.uploadName) {
            fs.unlink(`${filePath}/${file}`, (err) => {
              if (err) return reject(new ApiError(err));
            });
          }
        });
      });
    }
    // Dosya taşınıyor
    file.mv(`${filePath}/${uploadName}`, (err) => {
      // Hata varsa gönderildi
      if (err) return reject(new ApiError(err, 500));

      // İşlem başarıyla tamamlandı
      resolve(uploadName);
    });
  });
};
