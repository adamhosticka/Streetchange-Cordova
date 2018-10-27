
console.time('requiruju mysql')
var mysql = require('mysql')
console.timeEnd('requiruju mysql')

console.time('vytvarim mysql connection')
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "streetchange",
    multipleStatements: "true"
});
console.timeEnd('vytvarim mysql connection')

console.time('mysql connect()')
con.connect(function(err) {
    console.timeEnd('mysql connect()')
    if (err) throw err

    console.log("Connected!");

//   var sql = "SELECT * FROM types";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log(result);
//   });
})

console.log(1)

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(express.json());

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('www'));
app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

app.get('/index.js', function (req, res) {
    res.sendFile( __dirname + "/" + "index.js" );
 })
 app.get('/www/index.html', function (req, res) {
    res.sendFile( __dirname + "/" + "www" + "/" + "index.html" );
 })

app.get("/test", function(req, res) {
    res.end("<html><body><b>wqdaw</b></body></html>")
})

console.log(2)

app.get('/products', function(req, res) {
    productsMobile = [
        {
            name: "samsung a3"
        },
        {
            name: "huawei"
        }
    ]

    productsThirts = [
        {
            name: "nike"
        },
        {
            name: "adddidddass"
        }
    ]

    if (req.query.type === 'mobile') {
        products = productsMobile
    } else if (req.query.type === 'tshirts') {
        products = productsThirts
    } else {
        products = []
    }


    res.end(JSON.stringify(products))
})

app.get('/testSS', function(req, res) {

    console.log(req.query.id)
    const sql = "INSERT INTO ss (ss) VALUES ('" + req.query.id + "')";
    con.query(sql, function (err, results) {
        if (err) throw err
        res.end(JSON.stringify(results))
    })
})

app.get('/testAddItems', function(req, res) {
    console.log(req.query.brand)
    const sql = "INSERT INTO testitems (brand, type, name) VALUES ('" + req.query.brand + "', '" + req.query.type + "', '" + req.query.name + "')";
    con.query(sql, function (err, results) {
        if (err) throw err
        res.end(JSON.stringify(results))
    })
})

app.get('/profile-add-items', function(req, res) {
    req.query.action += "items"
    const sql = "INSERT INTO " + req.query.action + " (brandID,typeID,nameID,sizeID,condID,colorID) VALUES ('" + req.query.brand + "', '" + req.query.type + "', '" + req.query.name + "', '"  + req.query.size + "', '" + req.query.cond + "', '" + req.query.color + "')";
    con.query(sql, function (err, results) {
        if (err) throw err
        res.end(JSON.stringify(results))
    })
})

app.post('/comments', urlencodedParser, (req, res, next) => {
    params = req.body
    if (params.type != "normal") {
        return next("ERROR: invalid type")
    }


    comments = [
        {
            text: 'c1'
        },
        {
            text: 'c2'
        },
        {
            text: 'c3'
        },
        {
            text: 'c4'
        },
        {
            text: 'c5'
        }
    ]

    comments = comments.slice(0, req.body.size)


    res.end(JSON.stringify(comments))
})


app.post('/process_post', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   response = {
    //   first_name: req.body.first_name,
    //   last_name: req.body.last_name
        a: 1
   };
   
   console.log("response");
   console.log(response);

   res.end(JSON.stringify(response));
})





app.get('/products2', function(req, res) {
    /* products = [
        {
            name: "big",
            brand: "supreme",
            type: "hoodie"
        },
        {
            name: "medium",
            brand: "supreme",
            type: "hoodie"
        },
        {
            name: "small",
            brand: "supreme",
            type: "tee"
        } 
    ] */

    /* res.end(JSON.stringify(products)) */
})

app.get('/users', function(req, res) {
    /* users = [
        {
            id: "1",
            firstName: "Adam",
            lastName: "Hosticka",
            registerDate: "20032018",
            itemSell: "8",
            itemBuy: "2",
            info: "CusBus",
            linkOne: "www.facebook.com/gsdadadsdsadsaads",
            linkTwo: "www.facebook.com/vvvvvsdcxcxxcxccxcx",
            linkThree: "www.facebook.com/qweqweqeweqqewqwes"
        },
        {
            id: "2",
            firstName: "Venca",
            lastName: "Hosticka",
            registerDate: "25052018",
            itemSell: "15",
            itemBuy: "0",
            info: "CusBus",
            linkOne: "sdasda",
            linkTwo: "https://www.youtube.com/watch?v=qa0nCMVk2FE",
            linkThree: ""
        },
        {
            id: "3",
            firstName: "Stepan",
            lastName: "Korka",
            registerDate: "20042018",
            itemSell: "0",
            itemBuy: "9",
            info: "CusBus"
        },
        {
            id: "4",
            firstName: "Noel",
            lastName: "Cody",
            registerDate: "15062018",
            itemSell: "3",
            itemBuy: "4",
            info: "CusBus"
        }
    ] */

    const sql = "SELECT * FROM users"
    con.query(sql, function (err, results) {
        if (err) throw err
        res.end(JSON.stringify(results))
    })
})

app.get('/legitchecks', function(req, res) {
    /* legitchecks = [
        {
            id: "1",
            writerID: "2",
            recieverID: "1",
            text: "Lgt typecek mrkmrk nejsem jeho kamos irl a nescammujem deti",
            vote: "1",
            date: "5h"
        },
        {
            id: "2",
            writerID: "4",
            recieverID: "1",
            text: "Lgt typecek scammujem deti",
            vote: "1",
            date: "5h"
        },
        {
            id: "3",
            writerID: "2",
            recieverID: "3",
            text: "Lgt typecek mrkmrk nejsem jeho kamos irl a nescammujem deti",
            vote: "1",
            date: "5h"
        },
        {
            id: "4",
            writerID: "3",
            recieverID: "1",
            text: "Zmrd scammnul me o stovku btw nejsem kid",
            vote: "0",
            date: "5h"
        }
    ] */

    /* res.end(JSON.stringify(legitchecks)) */
})

app.get('/brands', function(req, res) {
    /* brands = [
        {
            id: "1",
            name: "Adidas"
        },
        {
            id: "2",
            name: "Anti Social Social Club"
        },
        {
            id: "3",
            name: "Diamond"
        },
        {
            id: "4",
            name: "Fila"
        },
        {
            id: "5",
            name: "Gucci"
        },
        {
            id: "6",
            name: "Horsefeathers"
        },
        {
            id: "7",
            name: "Levis"
        },
        {
            id: "8",
            name: "Luis Vuitton"
        },
        {
            id: "9",
            name: "New Era"
        },
        {
            id: "10",
            name: "Nike"
        },
        {
            id: "11",
            name: "North Face"
        },
        {
            id: "12",
            name: "O'Neill"
        },
        {
            id: "13",
            name: "Pleasures"
        },
        {
            id: "14",
            name: "Ralph Lauren"
        },
        {
            id: "15",
            name: "Stüssy"
        },
        {
            id: "16",
            name: "Supreme"
        },
        {
            id: "17",
            name: "Trasher"
        },
        {
            id: "18",
            name: "Vans"
        }
    ] */

    /* res.end(JSON.stringify(brands)) */

    const sql = "SELECT * FROM brands"
    con.query(sql, function (err, results) {
        if (err) throw err
        res.end(JSON.stringify(results))
    })
})

app.get('/types', function(req, res) {
    /* types = [
        {
            id: "1",
            name: "Bundy"
        },
        {
            id: "2",
            name: "Boty"
        },
        {
            id: "3",
            name: "Kalhoty"
        },
        {
            id: "4",
            name: "Košile"
        },
        {
            id: "5",
            name: "Kraťasy"
        },
        {
            id: "6",
            name: "Kšiltovky"
        },
        {
            id: "7",
            name: "Mikiny"
        },
        {
            id: "8",
            name: "Trička"
        },
        {
            id: "9",
            name: "Trenky"
        }
    ] */
    
    // types = types.slice(0, 2)
    // res.end(JSON.stringify(types))
    
    /* const sql = "SELECT * FROM types"
    
    console.time('query')
    con.query(sql, function (err, results) {
        console.timeEnd('query')
        if (err) throw err
        
        console.log(results)

        // results = results.map(function (result) {
        //     result.name = result.name + " HOVNO"
        //     result.time = Date.now()
        //     return result
        // })

        let time = Date.now()

        for (let result of results) {
            result.time = time
        }

        setTimeout(() => {
            results[0].time = Date.now()

            res.end(JSON.stringify(results))
        }, 20)
        

    }) */

    const sql = "SELECT * FROM types"
    con.query(sql, function (err, results) {
        if (err) throw err
        res.end(JSON.stringify(results))
    })
})

app.get('/items', function(req, res) {
    /* items = [
        {
            id: "1",
            name: "Fuck with your head tee",
            brandID: "16",
            typeID: "8"
        },
        {
            id: "2",
            name: "Mona Lisa tee",
            brandID: "16",
            typeID: "8"
        },
        {
            id: "3",
            name: "Ultraboost triple white",
            brandID: "1",
            typeID: "2"
        },
        {
            id: "4",
            name: "Never stop exploring tee",
            brandID: "11",
            typeID: "8"
        },
        {
            id: "5",
            name: "Blocked hoodie",
            brandID: "16",
            typeID: "7"
        },
        {
            id: "6",
            name: "Metallic 6-Panel",
            brandID: "16",
            typeID: "6"
        },
        {
            id: "7",
            name: "Bolt Basketball Short",
            brandID: "16",
            typeID: "5"
        }
    ] */

    /* res.end(JSON.stringify(items)) */

    const sql = "SELECT * FROM items"
    con.query(sql, function (err, results) {
        if (err) throw err
        res.end(JSON.stringify(results))
    })
})

app.get('/sizes', function(req, res) {
    /* sizes = [
        {
            id: "1",
            name: "XXXS"
        },
        {
            id: "2",
            name: "XXS"
        },
        {
            id: "3",
            name: "XS"
        },
        {
            id: "4",
            name: "S"
        },
        {
            id: "5",
            name: "M"
        },
        {
            id: "6",
            name: "L"
        },
        {
            id: "7",
            name: "XL"
        },
        {
            id: "8",
            name: "XXL"
        },
        {
            id: "9",
            name: "XXXL"
        },
        {
            id: "10",
            name: "XXXXL"
        }
    ] */

    /* res.end(JSON.stringify(sizes)) */

    const sql = "SELECT * FROM clothing_sizes"
    con.query(sql, function (err, results) {
        if (err) throw err
        res.end(JSON.stringify(results))
    })

})

app.get('/conditions', function(req, res) {

    const sql = "SELECT * FROM conditions ORDER BY id DESC"
    con.query(sql, function (err, results) {
        if (err) throw err
        res.end(JSON.stringify(results))
    })

})

app.get('/colors', function(req, res) {

    const sql = "SELECT * FROM basic_colors"
    con.query(sql, function (err, results) {
        if (err) throw err
        res.end(JSON.stringify(results))
    })

})

app.get('/items-to-sell', function(req, res) {

    /* const sql = "SELECT * FROM sellitems WHERE userID =" + req.query.userID */
    const sql = "SELECT * FROM sellitems"
    con.query(sql, function (err, results) {
        if (err) throw err
        res.end(JSON.stringify(results))
    })

})

app.get('/items-to-buy', function(req, res) {

    const sql = "SELECT * FROM buyitems"
    con.query(sql, function (err, results) {
        if (err) throw err
        res.end(JSON.stringify(results))
    })

})

app.get('/items-to-buy-matches', function(req, res) {

    /* const sql = "SELECT * FROM sellitems WHERE userID =" + req.query.userID */
    const sql = "SELECT * FROM buyitems WHERE id ='" + req.query.id + "'; SELECT * FROM sellitems WHERE brandID = '" + req.query.brandID + "';"
    console.log(sql)
    con.query(sql, function (err, results) {
        if (err) throw err
        console.log(results)
        res.end(JSON.stringify(results))
    })

})

app.get('/items-to-sell-matches', function(req, res) {

    /* const sql = "SELECT * FROM sellitems WHERE userID =" + req.query.userID */
    const sql = "SELECT * FROM buyitems WHERE id != " + req.query.id + "&brandID = " + req.query.brandID
    con.query(sql, function (err, results) {
        if (err) throw err
        res.end(JSON.stringify(results))
    })

})

app.get('/getparam', function(req, res) {
    const sql = "SELECT * FROM " + req.query.param + " WHERE id =" + req.query.id;
    /* console.log(sql) */
    con.query(sql, function (err, results) {
        if (err) throw err
        res.end(JSON.stringify(results))
    })
})


var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)

})