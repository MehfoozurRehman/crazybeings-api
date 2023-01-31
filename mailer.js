const path = require("path");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

async function mailer(subject, data, template) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  transporter.use(
    "compile",
    hbs({
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve(__dirname, "views"),
        defaultLayout: false,
      },
      viewPath: path.resolve(__dirname, "views"),
      extName: ".handlebars",
    })
  );
  let mailOptions = {
    from: "mehfoozijaz786@gmail.com",
    to: ["crazybeingstudios@gmail.com"],
    subject: subject,
    template: template,
    context: data,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log({ message: error });
    } else {
      console.log({
        message: "Email sent: " + info.response,
      });
    }
  });
}

module.exports = mailer;
