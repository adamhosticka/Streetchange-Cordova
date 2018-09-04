console.log("ok fe ready")

sizesLoaded = false;

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
            div.innerHTML = product.name + " " + product.brand
            
            productsEl.appendChild(div)
        }

        console.log("responseee", response);
    })
    .catch(function (error) {
        console.log("errorowhduhawdb");
        console.log(error);
    });
}

loadProfileInfo = (userID) => {
    axios.get('/users')

    .then(function (response) {

        var data = response.data

        userNameDiv = document.getElementById("profileName")
        userInfoDiv = document.getElementById("profile_description")
        userLinkOne = document.getElementById("linkOne")
        userLinkTwo = document.getElementById("linkTwo")
        userLinkThree = document.getElementById("linkThree")
        // productsEl.innerHTML = data
        for (user of data) {
            if(user.id == userID) {
                console.log("user", user)
                userNameDiv.innerHTML = user.firstName + " " + user.lastName
                userInfoDiv.innerHTML = user.info
                userLinkOne.innerHTML = user.linkOne
                userLinkTwo.innerHTML = user.linkTwo
                userLinkThree.innerHTML = user.linkThree
            }
        }

        console.log("responseee", response);
    })
    .catch(function (error) {
        console.log("errorowhduhawdb");
        console.log(error);
    });
}

loadLC = (userID) => {
    axios.get('/legitchecks')

    .then(function (response) {

        var data = response.data

        // productsEl.innerHTML = data
        for (legitcheck of data) {
            if(legitcheck.recieverID == userID) {

                var legitCheckDiv = document.getElementById('legitCheckDiv')
                var callOutDiv = document.createElement('div')
                callOutDiv.classList.add("callOutDiv")
                callOutDiv.classList.add("content_splitter")
                legitCheckDiv.appendChild(callOutDiv)

                var callOutHeader = document.createElement('div')
                callOutHeader.classList.add('callOutHeader')
                callOutDiv.appendChild(callOutHeader)

                var callOutHeaderImg = document.createElement('img')
                callOutHeaderImg.src = 'Img/profile01.png'
                callOutHeaderImg.classList.add('callOutHeaderImg')
                callOutHeader.appendChild(callOutHeaderImg)

                var writerNameH3 = document.createElement('h3')
                writerName = getUserName(legitcheck.writerID)
                writerNameH3.innerHTML = writerName
                callOutHeader.appendChild(writerNameH3)

                var dateP = document.createElement('p')
                dateP.innerHTML = legitcheck.date
                callOutHeader.appendChild(dateP)

                var callOutText = document.createElement('div')
                callOutText.classList.add('callOutText')
                callOutDiv.appendChild(callOutText)

                var legitCheckText = document.createElement('p')
                legitCheckText.innerHTML = legitcheck.text
                callOutText.appendChild(legitCheckText)
            }
        }

        /* console.log("responseee", response); */
    })
    .catch(function (error) {
        console.log(error);
    });
}

getUserName = (userID) => {
    axios.get('/users')

    .then(function (response) {
        var data = response.data

        // productsEl.innerHTML = data
        for (user of data) {
            if(user.id == userID) {
                var userName = user.firstName + " " + user.lastName
            }
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

brandSelectLoad = () => {
    axios.get('/brands')

    .then(function (response) {
        var data = response.data

        // productsEl.innerHTML = data
        for (brand of data) {
            var option = document.createElement('option')
            option.value = brand.id
            option.innerHTML = brand.name
            document.getElementById('selectBrand').appendChild(option)
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

typeSelectLoad = () => {
    axios.get('/types')

    .then(function (response) {

        var data = response.data
        for (type of data) {
            var option = document.createElement('option')
            option.value = type.id
            option.innerHTML = type.name
            document.getElementById('selectType').appendChild(option)
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

nameSelectLoad = () => {
    axios.get('/items')

    .then(function (response) {
        
        var data = response.data

        document.getElementById('selectName').innerHTML = ""
        var disabledOption = document.createElement('option')
        disabledOption.hidden = true
        disabledOption.selected = true
        disabledOption.disabled = true
        disabledOption.value = ""
        disabledOption.innerHTML = "Vyberte název"
        document.getElementById('selectName').appendChild(disabledOption)

        var selectBrand = document.getElementById('selectBrand')
        var selectType = document.getElementById('selectType')
        for (item of data) {
            if(selectBrand.value !== "" && selectType.value !== "") {
                if(selectBrand.value == item.brandID && selectType.value == item.typeID) {
                    var option = document.createElement('option')
                    option.value = item.id
                    option.innerHTML = item.name
                    document.getElementById('selectName').appendChild(option)
                }
            }else if(selectBrand.value !== "") {
                if(selectBrand.value == item.brandID) {
                    var option = document.createElement('option')
                    option.value = item.id
                    option.innerHTML = item.name
                    document.getElementById('selectName').appendChild(option)
                }
            }else if(selectType.value !== "") {
                if(selectType.value == item.typeID) {
                    var option = document.createElement('option')
                    option.value = item.id
                    option.innerHTML = item.name
                    document.getElementById('selectName').appendChild(option)
                }
            }else {
                var option = document.createElement('option')
                option.value = item.id
                option.innerHTML = item.name
                document.getElementById('selectName').appendChild(option)
            }
        }
    })
    .catch(function (error) {
        /* console.log("errorowhduhawdb"); */
        console.log(error);
    });
}

fillBrandAndType = () => {
    axios.get('/items')

    .then(function (response) {

        var selectBrand = document.getElementById('selectBrand')
        var selectType = document.getElementById('selectType')
        var selectName = document.getElementById('selectName')

        var data = response.data
        for (item of data) {
            if(item.id == selectName.value) {
                selectBrand.value = item.brandID
                selectType.value = item.typeID
            }
        }
       
        for (item of data) {
            for(i = 1; i < selectName.length; i++) {
                if(item.id == selectName[i].value ) {
                    if(selectBrand.value !== item.brandID || selectType.value !== item.typeID) {
                        selectName.remove(i)
                    }
                }
            }
        }

        sizeSelectLoad()
    })
    .catch(function (error) {
        console.log(error);
    });
}

sizeSelectLoad = () => {
    axios.get('/sizes')

    .then(function (response) {
        if(sizesLoaded == false) {
            selectSize = document.getElementById('selectSize')
            for(i = 0; i < selectSize.length; i++) {
                if(selectSize[i].value == '') {selectSize[i].innerHTML = "Vyberte velikost"}
            }

            var data = response.data
            for (size of data) {
                var option = document.createElement('option')
                option.value = size.id
                option.innerHTML = size.name
                document.getElementById('selectSize').appendChild(option)
            }

            sizesLoaded = true
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

/* itemsForSaleLoad = () => {
    axios.get('/sizes')
    
    .then(function (response) {
        
        selectSize = document.getElementById('selectSize')
        for(i = 0; i < selectSize.length; i++) {
            if(selectSize[i].value == '') {selectSize[i].innerHTML = "Vyberte velikost"}
        }
        
        var data = response.data
        for (size of data) {
            var option = document.createElement('option')
            option.value = size.id
            option.innerHTML = size.name
            document.getElementById('selectSize').appendChild(option)
        }
    })
    .catch(function (error) {
        console.log(error);
    });
} */

/* insertTypesIntoDatabase = () => {
    axios.get('/types')
    console.log('-------------------------------------------------------------------------------------------------------------')
    .then(function (response) {
        var data = response.data
        con.connect(function(err) {
        if (err) throw err;
        for (type of data) {
            var sql = "INSERT INTO types VALUES (type.name))";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log(result);
            });
        }
        });
    })
    .catch(function (error) {
        console.log(error);
    });
} */

try {
    test100()
}
catch(error) {
    console.log(error);
}

try {
    loadProfileInfo(2)
}
catch(error) {
    console.log(error);
}

try {
    loadLC(1)
}
catch(error) {
    console.log(error);
}

try {
    brandSelectLoad()
}
catch(error) {
    console.log(error);
}

try {
    typeSelectLoad()
}
catch(error) {
    console.log(error);
}

try {
    nameSelectLoad()
}
catch(error) {
    console.log(error);
}

try {
    itemsForSaleLoad()
}
catch(error) {
    console.log(error);
}

try {
    insertTypesIntoDatabase()
}
catch(error) {
    console.log(error);
}


console.log(moment().format())