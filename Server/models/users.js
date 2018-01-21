var con = require("./index");
var utils = require("./utils");
const getUser = (user, callback) => {
  const statement = "SELECT * FROM users WHERE email = ?";
  con.getConnection((err, sql) => {
    sql.query(statement, [user.email], (er, result) => {
      if (er || result.length === 0) callback(true, null);
      else callback(null, result);
    })
  })
}

const addUser = (user, cb) => {
  const statement = "INSERT INTO users (email, password, fullname, role) VALUES (?, ?, ?, ?)";
  con.getConnection((err, sql) => {
    sql.query(statement, [user.email, user.password, user.fullname, user.role], (er, result) => {
      if (er) cb(er, null);
      else {
        getUser(user, (er, result) => {
          if (er) cb(er, null);
          else cb(null, result[0]);
        })
      }
    })
  })
}

const updateUser = (user, field, cb) => {
  const statement = utils.getUpdateStatement("users", user.id, field);
  con.getConnection((err, sql) => {
    sql.query(statement, (er, result) => {
      if (er) cb(er, null);
      else cb(null, result);
    })
  })
}

const changePassword = (id, field, cb) => {
  const statement = utils.getUpdateStatement("users", id, field);
  con.getConnection((err, sql) => {
    sql.query(statement, (er, result) => {
      if (er) cb(er, null);
      else cb(null, result);
    })
  })
}

module.exports = {
  getUser,
  addUser,
  updateUser,
  changePassword,
}