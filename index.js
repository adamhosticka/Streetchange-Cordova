console.log("ok fe ready")


processData = (data) => {
    productsEl = document.getElementById("products")
    // productsEl.innerHTML = data
    productsEl.innerHTML = "";
    for (product of data) {
        
        div = document.createElement("div")
        div.innerHTML = product.name
        
        productsEl.appendChild(div)
    }
}

test1 = function () {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function() {
        console.log("readystate", xmlHttp.readyState)
    
    
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            console.log("data ok")
            console.log(xmlHttp.responseText)
    
            data = JSON.parse(xmlHttp.responseText)
    
            processData(data)
        }
    }


    xmlHttp.open("GET", "/products", true); // true for asynchronous 
    xmlHttp.send(null);
    
}


test2 = () => {
    axios.get('/products?type=tshirts')
    /* axios({
        method: "get",
        url: "/products?type=tshirts",
        type: "tshirts"
    }) */
    .then(function (response) {
        console.log(response);

        processData(response.data)
    })
    .catch(function (error) {
        console.log("errorowhduhawdb");
        console.log(error);
    });
}

test3 = () => {
    axios({
        method: "get",
        url: "/products?type=tshirts"
    }).then((response) => {
        console.log("resp.data", response.data)
    })
}


test4 = () => {
    axios({
        method: "post",
        url: "/comments",
        data: {
            type: "normal",
            size: 2
        }
    }).then((response) => {
        console.log("resp.data", response.data)
    })
}

test5 = (typeOfProduct) => {
    axios.get('/products?type=' + typeOfProduct)
    /* axios({
        method: "get",
        url: "/products?type=tshirts",
        type: "tshirts"
    }) */
    .then(function (response) {
        console.log("responseee", response);
        console.log("responseeedataa", response.data);
        if(response.data != "") {
            processData(response.data)
        }
        else {
            console.log("Nespravny typ")
        }
    })
    .catch(function (error) {
        console.log("errorowhduhawdb");
        console.log(error);
    });
}

function test6() {
    button = document.getElementById('button')
    button.addEventListener("click", function(){
        var typeOfProduct
        console.log(typeOfProduct)
        typeOfProduct = document.getElementById('input').value
        console.log(typeOfProduct + "hovno")
        test5(typeOfProduct)
    })
}

test100 = () => {
    axios.get('/products2')

    .then(function (response) {

        var data = response.data

        productsEl = document.getElementById("product_name")
        // productsEl.innerHTML = data
        productsEl.innerHTML = "";
        for (product of data) {

            console.log("product", product)
            
            div = document.createElement("div")
            div.innerHTML = product.name
            
            productsEl.appendChild(div)
        }

        console.log("responseee", response);
    })
    .catch(function (error) {
        console.log("errorowhduhawdb");
        console.log(error);
    });
}

// test6()
test100()