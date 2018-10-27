var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "streetchange",
  multipleStatements: "true"
});

con.connect(function(err) {
  if (err) throw err;

  var date = new Date()
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  date = year + "-" + month + "-" + day;

  // INSERT INTO buyitems (userID, brandID, typeID, nameID, sizeID, condID, colorID) VALUES ('1', '1', '2', '1', '4', '10', '2'), ('1', '16', '9', '2', '5', '9', '1'), ('1', '16', '9', '3', '7', '7', '4')
  /* var sql = "INSERT INTO conditions (name) VALUES ('1/10'), ('2/10'), ('3/10'), ('4/10'), ('5/10'), ('6/10'), ('7/10'), ('8/10'), ('9/10'), ('10/10')"; */
  /* var sql = "INSERT INTO users (firstName, lastName, registerDate, info, itemSell, itemBuy, linkOne) VALUES ('Adam', 'Hosticka', '" + date + "', 'Takze ahojda ja Jsem JirkA a DneS jseM byL utuber', '4', '8', 'www.facebook.com')"; */
  /* var sql = "CREATE TABLE sellItems (id INT AUTO_INCREMENT PRIMARY KEY, userID VARCHAR(255), brand VARCHAR(255), type VARCHAR(255), name VARCHAR(255), size VARCHAR(255), cond VARCHAR(255), color VARCHAR(255))"; */                     
  var sql = "SELECT * FROM items; SELECT * FROM buyitems"

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});