const nodemailer = require("nodemailer");

module.exports = (emitter) => {
    emitter.on("send_email", async (data) => {
        // Mail gönderen ayarları
        const transporter = nodemailer.createTransport({
          host: Config.EMAIL.HOST,
          port: Config.EMAIL.PORT,
          auth: {
            user: Config.EMAIL.USER,
            pass: Config.EMAIL.PASS,
          },
        });
    
        // Alıcı ayarları
        let info = await transporter.sendMail({
          from: `Node Server Test < ${Config.EMAIL.FROM} >`, // sender address
          ...data
        });
      });
}