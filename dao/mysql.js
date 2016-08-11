var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "microblogging"
});

connection.connect();

exports.connection = connection;
