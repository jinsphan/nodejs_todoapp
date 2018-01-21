var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var isEmpty = require("lodash").isEmpty;
const KEY_SECRET = require("../config/index").KEY_SECRET;

var userModel = require("../models/users");
var sendMail = require("../utils/sendMail_utils");

const patternForEmail = /^[a-zA-Z0-9]{1,}@[a-zA-Z0-9]{1,}\.[a-zA-Z0-9]{1,}$/;
const patternForPassword = /^[a-zA-Z0-9]{1,}$/;
const patternForText = /^[^\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\>|\?|\/|\""|\;]+$/;
const saltRounds = 10;

// -------------- User Controller -------------

const login = (req, res) => {
  const vld = _validateForm(req.body);
  if (!vld.check) {
    res.status(400);
    res.json(vld.errors);
  } else {
    userModel.getUser(req.body, (er, result) => {
      if(result) {
        if (result[0].status !== 1) {
          res.status(404);
          res.json({email: "Email inactive!"});
        } else {
          const userGetted = result[0];
          bcrypt.compare(req.body.password, userGetted.password, (er, check) => {
            if (check) {
              res.status(200);
              const token = _jwtGenerate(userGetted);
              res.json({token});
            } else {
              res.status(404);
              res.json({password: "Password incorrect!"});
            }
          })
        }
      } else {
        res.status(404);
        res.json({
          email: "Email incorrect!"
        });
      }
    })
  }
}

const register = async (req, res) => {
  const vld = _validateForm(req.body);
  if (!vld.check) {
    res.status(400);
    res.json(vld.errors);
  } else {
    const user = {
      ...req.body,
      role: 2,
      status: 0,
    };
    userModel.getUser(user, (er, result) => {
      if (!result) {
        bcrypt.hash(user.password, saltRounds, (er, hash) => {
          user.password = hash;
          userModel.addUser(user, (er, result) => {
            if (er) {
              res.status(401);
              res.send("Cant not add user!");
            } else {
              const userToSendMail = {
                ...result,
                token: _jwtGenerate(result),
              };
              sendMail(userToSendMail, "confirm", st => {
                res.status(st);
                res.send("Register successfull");
              });
            }
          })
        }, KEY_SECRET);
      } else {
        res.status(409);
        res.json({email: "Someone already has that email!"});
      }
    })
  }
}

const forgotPassword = (req, res) => {
  const vld = _validateForm({email: req.params.email});
  if (!vld.check) {
    res.status(400).json(vld.errors);
  } else {
    userModel.getUser({email: req.params.email}, (er, result) => {
      if (result) {
        const userToSendMail = {
          ...result[0],
          token: _jwtGenerate(result[0], false),
        };
        sendMail(userToSendMail, "changepassword", st => {
          res.status(st);
          res.send("Check your email to change password!");
        });
      } else {
        res.status(400).json({email: "Email not available!"});
      }
    })
  }
}

const changePassword = (req, res) => {
  if (req.body.password === '') {
    res.status(400).json({password: "Password can not empty!"});
  } else if (req.body.password !== req.body.cfpassword) {
    res.status(400).json({cfpassword: "Password confirm incorrect!"});
  } else {
    bcrypt.hash(req.body.password, saltRounds, (er, hash) => {
      userModel.changePassword(req.payload.id, {password: hash}, (er, result) => {
        if (er) {
          res.status(401).send("Unthorization");
        } else if (result.affectedRows === 0) {
          res.status(500).send("Error update user");
        } else {
          res.status(200).json({
            token: _jwtGenerate(req.payload),
          });
        }
      })
    })
  }
}

const confirmAccount = (req, res) => {
  userModel.getUser(req.payload, (er, result) => {
    if (result) {
      if (result[0].status === 0) {
        userModel.updateUser(req.payload, {status: 1}, (er, result) => {
          if (er) {
            res.status(401);
            res.send("Unauthoriazion");
          } else if(result.affectedRows > 0){
            userModel.getUser(req.payload, (er, result) => {
              if (er) {
                res.status(401);
                res.send("Unauthoriazion");
              } else {
                res.status(200);
                res.json({token: _jwtGenerate(result[0])});
              }
            })
          } else {
            res.status(400);
            res.send("Cant not update status!");
          }
        })
      } else {
        res.status(401);
        res.send("Now Allowed!");
      }
    } else {
      res.status(404);
      res.send("Not Found");
    }
  })
}

const checkAuthSuccess = (req, res) => {
  userModel.getUser(req.payload, (er, result) => {
    if (result[0].status !== 1) {
      res.status(401);
      res.send("UnAuthorization");
    } else {
      res.status(200);
      res.send("Authentiation.");
    }
  })
}

const _validateForm = (user) => {
  let errors = {};
  let check = true;

  Object.keys(user).forEach(key => {
    if (key === "email") {
      errors[key] = user[key].match(patternForEmail) === null ? `${_FirstUpperCase(key)} invalid!` : null;
    } else if (key === "password" || key === "confirm") {
      errors[key] = user[key].match(patternForPassword) === null ? `${_FirstUpperCase(key)} invalid!` : null;
      if (key === "confirm" && user[key] !== user.password) errors[key] = "Confirm incorrect!";
    } else {
      errors[key] = user[key].match(patternForText) === null ? `${_FirstUpperCase(key)} invalid!` : null;
    }
  });

  Object.keys(errors).forEach(key => {
    if (errors[key] !== null) {
      check = false;
    }
  })

  return {
    check,
    errors
  };
}

const _jwtGenerate = (user, isAllowLogin = true) => {
  return jwt.sign({
    id: user.id,
    email: user.email,
    fullname: user.fullname,
    role: user.role,
    status: user.status,
    isAllowLogin,
  }, KEY_SECRET)
}

const _FirstUpperCase = (str) => {
  return `${str.charAt(0).toUpperCase() + str.slice(1)}`;
}

module.exports = {
  login,
  register,
  confirmAccount,
  checkAuthSuccess,
  forgotPassword,
  changePassword,
}