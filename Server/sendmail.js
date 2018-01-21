
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "todoapp.bkdn@gmail.com",
    pass: "jrtinhGM001"
  }
});

var mailOptions = {
  from: "todoapp.bkdn@gmail.com",
  to: "pvtinh1996@gmail.com",
  subject: "Create account Todo App",
  html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Create Account Todo App</title>
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
        <p>Dear, Someone!</p>
        <p>Welcom to <b>Todo App</b></p>
        <p>We received a request to confirm your TodoApp account.</p>
        <a href="https://google.com">Click here to login with your account.</a>
        <p>If you can not access your account. please <a href="">let us know</a>.</p>
        <p>Thank you!</p>
      </div>
    </body>
    </html>
  `
}

transporter.sendMail(mailOptions, (er, res) => {
  if (er) {
    console.log(er);
  } else {
    console.log("Email sent: " + res.response);
  }
})
