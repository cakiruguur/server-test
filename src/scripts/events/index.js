const eventEmitter = require("./eventEmitter");
const nodemailer = require("nodemailer");

module.exports = () => {
  // @INFO: Sıfırlanan şifre mail gönderme işlemi
  eventEmitter.on("send_email", async (data) => {
    // Mail gönderen ayarları
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Alıcı ayarları
    let info = await transporter.sendMail({
      from: `Node Server Test < ${process.env.EMAIL_FROM} >`, // sender address
      ...data
    });
  });
};
