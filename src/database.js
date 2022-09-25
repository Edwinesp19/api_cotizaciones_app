const mysql = require("mysql");

const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "syspedidos3",
});
// const mysqlConnection = mysql.createConnection({
//   host: '107.180.26.80',
//   user: 'darcornetshop',
//   password: 'darcornetshop',
//   database: 'syspedidos4',
//   multipleStatements: true
// });

mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log("db is connected");
  }
});

module.exports = mysqlConnection;
