var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "streetchange"
});

con.connect(function(err) {
  if (err) throw err;
  // var sql = "INSERT INTO types (type) VALUES ('Bundy'), ('Boty'), ('Kalhoty'), ('Košile'), ('Kraťasy'), ('Kšiltovky'), ('Mikiny'), ('Spodní prádlo'), ('Trička')";
  var sql = "ALTER TABLE clothing_sizes CHANGE COLUMN size name VARCHAR(255)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});
