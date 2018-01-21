var mysql = require("mysql");
var db = require("../config").db;

var con = mysql.createPool({
  connectionLimit: 100,
  host: db.DB_HOST,
  user: db.DB_USER,
  password: db.DB_PASSWORD,
  database: db.DB_NAME
});

module.exports = con;