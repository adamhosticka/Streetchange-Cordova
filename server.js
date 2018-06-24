
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
    products = [
        {
            name: "big",
            brand: "supreme",
            type: "hoodie"
        },
        /* {
            name: "medium",
            brand: "supreme",
            type: "hoodie"
        },
        {
            name: "small",
            brand: "supreme",
            type: "tee"
        } */
    ]

    res.end(JSON.stringify(products))
})




var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)

})