var nodemailer = require("nodemailer");
var mail = require("../config/index").mail;
var BASE_URL = require("../config/index").BASE_URL;
var transporter = nodemailer.createTransport({
  service: mail.SERVICE,
  auth: {
    user: mail.USER_EMAIL,
    pass: mail.PASS_EMAIL
  }
});

const sendMail = (user, typeMail, cb) => {
  console.log("START SENDMAIL");
  var mailOptions = {
    from: mail.USER_EMAIL,
    to: user.email,
    subject: "Confirm account Todo App",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Confirm account Todo App</title>
        <style>
          header {
            background-color: rgb(22, 39, 39);
            padding: 10px;
            font-size: 50px;
            color: white;
            text-align: center;
            font-weight: bold;
            font-family: Courier New, Courier, monospace;
          }
          p {
            font-size: 22px;
          }
          a{
            text-decoration: none;
            color: rgb(6, 174, 204);
          }
          a:hover {
            color: black;
          }
        </style>
      </head>
      <body>
        <header>
          <span>TODO APP</span>
        </header>
        <div>
          <p>Dear ${user.fullname},</p>
          <p>Welcom to <b>Todo App</b>!</p>
          <p>We received a request to ${typeMail} your <b>Todo App</b> account.</p>
          <a href='${BASE_URL + '/account/'+ typeMail + "/" + user.token}'>Click here to ${typeMail} your account</a>
          <p>If you can not access your account. please <a href="">let us know</a>.</p>
          <p>Thank you!</p>
        </div>
      </body>
      </html>
    `
  }
  transporter.sendMail(mailOptions, (er, res) => {
    if (er) {
      cb(404);
      console.log("Cant not send mail: " + er);
    } else {
      cb(200);
      console.log("Email sent: " + res.response);
    }
  })
}

module.exports = sendMail;