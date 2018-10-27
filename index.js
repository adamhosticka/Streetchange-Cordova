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
                userLinkOne.href = user.linkOne
                userLinkTwo.href = user.linkTwo
                userLinkThree.href = user.linkThree
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

conditionsSelectLoad = () => {
    axios.get('/conditions')

    .then(function (response) {

        var data = response.data
        for (condition of data) {
            var option = document.createElement('option')
            option.value = condition.id
            option.innerHTML = condition.name
            document.getElementById('selectCondition').appendChild(option)
        }

    })
    .catch(function (error) {
        console.log(error);
    });
}

colorsSelectLoad = () => {
    axios.get('/colors')

    .then(function (response) {

        var data = response.data
        for (color of data) {
            var option = document.createElement('option')
            option.value = color.id
            option.innerHTML = color.name
            document.getElementById('selectColor').appendChild(option)
        }

    })
    .catch(function (error) {
        console.log(error);
    });
}


legitcheckLinksSelectLoad = (userID) => {
    axios.get('/users')

    .then(function (response) {

        userLinkOne = document.getElementById("linkOne")
        userLinkTwo = document.getElementById("linkTwo")
        userLinkThree = document.getElementById("linkThree")
        var data = response.data
        for (user of data) {
            if(user.id == userID) {
                userLinkOne.value = user.linkOne
                userLinkTwo.value = user.linkTwo
                userLinkThree.value = user.linkThree
            }
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

/* function test420hah() {
    button = document.getElementById('button')
    button.addEventListener("click", function(){
        var ssId
        ssId = document.getElementById('input').value
        test69hah(ssId)
    })
}

test69hah = (ssId) => {
    axios.get('/testSS?id=' + ssId)
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
} */

/* function test001() {
    button = document.getElementById('profile_add_accept_button')
    button.addEventListener("click", function(){
        var selectBrand = document.getElementById('selectBrand')
        var selectType = document.getElementById('selectType')
        var selectName = document.getElementById('selectName')

        if(selectBrand.value != "" && selectType.value != "" && selectName.value != "") {
            selectBrand.style.borderColor = "black"
            selectType.style.borderColor = "black"
            selectName.style.borderColor = "black"
            test002(selectBrand.value, selectType.value, selectName.value)
        } else {
            selectBrand.style.borderColor = "red"
            selectType.style.borderColor = "red"
            selectName.style.borderColor = "red"
        }
    })
} */

/* test002 = (brand, type, name) => {
    axios.get('/testAddItems?brand=adidas&type=boty&name=ubpico')
    axios.get('/testAddItems?brand=' + brand + '&type=' + type + '&name=' + name)
    axios.get('/testAddItems', {
        params: {
          brand: '5',
          type: type,
          name: name
        }
    })

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
} */

profileAddChangeAction = () => {
    var actionSelect = document.getElementById('selectAction')
    var sellAddWrapper = document.getElementById('sell_add_wrapper')
    var buyAddWrapper = document.getElementById('buy_add_wrapper')
    var legitcheckAddWrapper = document.getElementById('lc_add_wrapper')
    var sellAddWraperInputs = sellAddWrapper.getElementsByTagName('input')
    var buyAddWraperSelects = buyAddWrapper.getElementsByTagName('select')
    var legitcheckAddWraperInputs = buyAddWrapper.getElementsByTagName('input')
    var acceptButton = document.getElementById('profile_add_accept_button')

    var unfilled = false;
    var arr = new Array();
    if(actionSelect.value == 'sell') {
        for(var i = 0; i < buyAddWraperSelects.length; i++) {
            if(buyAddWraperSelects[i].value == '') {
                unfilled = true;                  
            } else {arr[i] = buyAddWraperSelects[i].value;}
        }
        if(unfilled == false) {
            profileAddItem(arr, "sell")
        }
    }

    if(actionSelect.value == 'buy') {
        for(var i = 0; i < buyAddWraperSelects.length; i++) {
            if(buyAddWraperSelects[i].value == '') {
                unfilled = true;
            } else {arr[i] = buyAddWraperSelects[i].value;}
        }
        if(unfilled == false) {
            console.log(arr)
            profileAddItem(arr, "buy")
        }
    }
    
    if(actionSelect.value == 'legitcheck') {
        for(var i = 0; i < legitcheckAddWraperInputs.length; i++) {
            arr[i] = legitcheckAddWraperInputs[i].value    
        }
        profileAddLc(arr)
    }
    
    if(actionSelect.value == 'sell') {
        sellAddWrapper.classList.remove('display_none')
        buyAddWrapper.classList.remove('display_none')
        legitcheckAddWrapper.classList.add('display_none')

        for(var i = 0; i < sellAddWraperInputs.length; i++) {
            sellAddWraperInputs[i].value = ''
        }

        for(var i = 0; i < buyAddWraperSelects.length; i++) {
            buyAddWraperSelects[i].value = ''
        }
    }

    if(actionSelect.value == 'buy') {
        sellAddWrapper.classList.add('display_none')
        buyAddWrapper.classList.remove('display_none')
        legitcheckAddWrapper.classList.add('display_none')

        for(var i = 0; i < buyAddWraperSelects.length; i++) {
            buyAddWraperSelects[i].value = ''
        }
    }

    if(actionSelect.value == 'legitcheck') {
        sellAddWrapper.classList.add('display_none')
        buyAddWrapper.classList.add('display_none')
        legitcheckAddWrapper.classList.remove('display_none')
    }
}

profileAddItem = (arr, action) => {

    var brand = arr[0]
    var type = arr[1]
    var name = arr[2]
    var size = arr[3]
    var cond = arr[4]
    var color = arr[5]
    console.log(brand, cond)

    axios.get('/profile-add-items?brand=' + brand + '&type=' + type + '&name=' + name + '&size=' + size + '&cond=' + cond + '&color=' + color + '&action=' + action)

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

profileAddLc = (arr) => {
    var linkone = arr[0]
    var linktwo = arr[1]
    var linkthree = arr[2]
    axios.get('/testAddItems?linkone=' + linkone + '&linktwo=' + linktwo + '&linkthree=' + linkthree)

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

/* try {
    test100()
}
catch(error) {
    console.log(error);
} */

try {
    loadProfileInfo(2)
}
catch(error) {
    console.log(error);
}

/* try {
    loadLC(1)
}
catch(error) {
    console.log(error);
} */

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
    conditionsSelectLoad()
}
catch(error) {
    console.log(error);
}

try {
    colorsSelectLoad()
}
catch(error) {
    console.log(error);
}

try {
    legitcheckLinksSelectLoad(2)
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

/* try {
    test6()
}
catch(error) {
    console.log(error);
} */

/* try {
    test420hah()
}
catch(error) {
    console.log(error);
} */

try {
    test001()
}
catch(error) {
    console.log(error);
}

loadItemsBuy = (userID) => {
    axios.get('/items-to-buy?userid=' + userID)

    .then(function (response) {
        var data = response.data

        var content = document.getElementById('swipe_layout_buy_items')
        var counter = 0
        var counterLoaded = 0
        var id = new Array()
        var brand = new Array()
        var type = new Array()
        var name = new Array()
        var size = new Array()
        var cond = new Array()
        var color = new Array()
        var brandID = new Array()
        var typeID = new Array()
        var nameID = new Array()

        for(item of data) {  
            id[counter] = item.id
            brandID[counter] = item.brandID
            typeID[counter] = item.typeID
            nameID[counter] = item.nameID
            console.log(nameID[counter])
            brand[counter] = getParam(item.brandID, "brands")
            brand[counter].then(function(result) {
                brand[counterLoaded] = result;
                console.log(brand, counterLoaded)
            })
            type[counter] = getParam(item.typeID, "types")
            type[counter].then(function(result) {
                type[counterLoaded] = result;
            })
            name[counter] = getParam(item.nameID, "items")
            name[counter].then(function(result) {
                name[counterLoaded] = result;
            })
            size[counter] = getParam(item.sizeID, "clothing_sizes")
            size[counter].then(function(result) {
                size[counterLoaded] = result;
            })
            cond[counter] = getParam(item.condID, "conditions")
            cond[counter].then(function(result) {
                cond[counterLoaded] = result;
            })
            color[counter] = getParam(item.colorID, "basic_colors")
            color[counter].then(function(result) {
                color[counterLoaded] = result;
                counterLoaded += 1
                if(counterLoaded >= 4) {
                    for(i = 0; i < counterLoaded; i++) {
                        console.log(brand[i])

                        var itemViewBuy = document.createElement('a')
                        var nameEl = document.createElement('h2')
                        var brandEl = document.createElement('h4')
                        var sizeEl = document.createElement('h3')
                        var condEl = document.createElement('h3')
                        var colorEl = document.createElement('h3')

                        itemViewBuy.classList.add('itemViewBuy')
                        itemViewBuy.href = "/matched_items_buy.html?id="+ id[i] +"&brandID="+ brandID[i] +"&typeID="+ typeID[i] +"&nameID="+ nameID[i]
                        /* itemViewBuy.href = "/matched_items_buy.html" */
                        /* itemViewBuy.onclick = function() {window.onload = function() {itemsToBuyMatches(id[i], brandID[i], typeID[i], nameID[i], i)}} */
                        nameEl.innerHTML = name[i]
                        brandEl.innerHTML = brand[i]
                        sizeEl.innerHTML = "Velikost: " + size[i]
                        condEl.innerHTML = "Stav: " + cond[i]
                        colorEl.innerHTML = "Barva: " + color[i]

                        content.appendChild(itemViewBuy)
                        itemViewBuy.appendChild(nameEl)
                        itemViewBuy.appendChild(brandEl)
                        itemViewBuy.appendChild(sizeEl)
                        itemViewBuy.appendChild(condEl)
                        itemViewBuy.appendChild(colorEl)
                    }
                }
            })

            counter += 1
        }
    })
    .catch(function (error) {
        console.log("errorowhduhawdb");
        console.log(error);
    });
}

loadItemsSell = (userID) => {
    axios.get('/items-to-sell?userid=' + userID)

    .then(function (response) {
        var data = response.data

        var content = document.getElementById('swipe_layout_sell_items')
        var counter = 0
        var counterLoaded = 0
        var brand = new Array()
        var type = new Array()
        var name = new Array()
        var size = new Array()
        var cond = new Array()
        var color = new Array()
        var main_photo = new Array()
        var description = new Array()

        for(item of data) {
            brand[counter] = getParam(item.brandID, "brands")
            brand[counter].then(function(result) {
                brand[counterLoaded] = result;
                console.log(brand, counterLoaded)
            })
            type[counter] = getParam(item.typeID, "types")
            type[counter].then(function(result) {
                type[counterLoaded] = result;
            })
            name[counter] = getParam(item.nameID, "items")
            name[counter].then(function(result) {
                name[counterLoaded] = result;
            })
            size[counter] = getParam(item.sizeID, "clothing_sizes")
            size[counter].then(function(result) {
                size[counterLoaded] = result;
            })
            cond[counter] = getParam(item.condID, "conditions")
            cond[counter].then(function(result) {
                cond[counterLoaded] = result;
            })
            main_photo[counter] = item.main_photo
            description[counter] = item.description
            
            color[counter] = getParam(item.colorID, "basic_colors")
            color[counter].then(function(result) {
                color[counterLoaded] = result;

                counterLoaded += 1
                if(counterLoaded >= 2) {
                    for(i = 0; i < counterLoaded; i++) {

                        var itemViewSell = document.createElement('a')
                        var itemViewPhoto = document.createElement('div')
                        var itemViewText = document.createElement('div')
                        var itemViewName = document.createElement('div')
                        var mainPhoto = document.createElement('img')
                        var nameEl = document.createElement('h2')
                        var brandEl = document.createElement('h4')
                        var sizeEl = document.createElement('h3')
                        var condEl = document.createElement('h3')
                        var colorEl = document.createElement('h3')

                        itemViewSell.classList.add('itemView')
                        itemViewPhoto.classList.add('itemViewPhoto')
                        itemViewText.classList.add('itemViewText')
                        itemViewName.classList.add('itemViewName')
                        mainPhoto.classList.add('itemViewPhoto')

                        itemViewSell.href = "/items-to-sell-matches?id=1&brandID=1"
                        mainPhoto.src = "Img/" + main_photo[i]
                        nameEl.innerHTML = name[i]
                        brandEl.innerHTML = brand[i]
                        sizeEl.innerHTML = "Velikost: " + size[i]
                        condEl.innerHTML = "Stav: " + cond[i]
                        colorEl.innerHTML = "Barva: " + color[i]
                        console.log(description[i])

                        content.appendChild(itemViewSell)
                        itemViewSell.appendChild(itemViewPhoto)
                        itemViewSell.appendChild(itemViewText)
                        itemViewText.appendChild(itemViewName)
                        itemViewPhoto.appendChild(mainPhoto)
                        itemViewName.appendChild(nameEl)
                        itemViewText.appendChild(brandEl)
                        itemViewText.appendChild(sizeEl)
                        itemViewText.appendChild(condEl)
                        itemViewText.appendChild(colorEl)
                    }
                }
            })
            
            counter += 1
        }
    })
    .catch(function (error) {
        console.log("errorowhduhawdb");
        console.log(error);
    });
}

itemsToBuyMatches = () => {
    var url_string = window.location.href
    var url = new URL(url_string)
    /* var id = url.searchParams.get("id")
    var brandID = url.searchParams.get("brandID")
    var typeID = url.searchParams.get("typeID")
    var nameID = url.searchParams.get("nameID") */
    
    id = 1
    brandID = 1 
    typeID = 4
    nameID = 5 
    axios.get('/items-to-buy-matches?id='+ id +'&brandID='+ brandID +'&typeID='+ typeID +'&nameID='+ nameID)
    /* axios.get('/matched_items_buy.html?id='+ id +'&brandID='+ brandID +'&typeID='+ typeID +'&nameID='+ nameID) */

    .then(function (response) {
        var data = response.data
        console.log(data, "kUNDAaaAdada")

        var content = document.getElementById('matched_items_content')
        var counter = 0
        var counterLoaded = 0
        var id = new Array()
        var brand = new Array()
        var type = new Array()
        var name = new Array()
        var size = new Array()
        var cond = new Array()
        var color = new Array()
        var brandID = new Array()
        var typeID = new Array()
        var nameID = new Array()
        var main_photo = new Array()
        var description = new Array()
        
        var brand0
        var name0
        var size0
        var cond0
        var color0

        for(item of data[0]) {
            brand0 = getParam(item.brandID, "brands")
            brand0.then(function(result) {
                brand0 = result;
            })
            name0 = getParam(item.nameID, "items")
            name0.then(function(result) {
                name0 = result;
            })
            size0 = getParam(item.sizeID, "clothing_sizes")
            size0.then(function(result) {
                size0 = result;
            })
            cond0 = getParam(item.condID, "conditions")
            cond0.then(function(result) {
                cond0 = result;
            })
            color0 = getParam(item.colorID, "basic_colors")
            color0.then(function(result) {
                color0 = result;

                var itemViewBuy = document.createElement('div')
                var nameEl = document.createElement('h2')
                var brandEl = document.createElement('h4')
                var sizeEl = document.createElement('h3')
                var condEl = document.createElement('h3')
                var colorEl = document.createElement('h3')

                itemViewBuy.classList.add('itemViewBuy', 'content_splitter')
                nameEl.innerHTML = name0
                brandEl.innerHTML = brand0
                sizeEl.innerHTML = "Velikost: " + size0
                condEl.innerHTML = "Stav: " + cond0
                colorEl.innerHTML = "Barva: " + color0

                content.appendChild(itemViewBuy)
                itemViewBuy.appendChild(nameEl)
                itemViewBuy.appendChild(brandEl)
                itemViewBuy.appendChild(sizeEl)
                itemViewBuy.appendChild(condEl)
                itemViewBuy.appendChild(colorEl)
            })
        }
        
        for(item of data[1]) {
            console.log("JAJAJAJAJJAJAJJJJJJJJJJJJJJJJAAAAAAAAAAAAAAAAAAAAAAAA")
            brand[counter] = getParam(item.brandID, "brands")
            brand[counter].then(function(result) {
                brand[counterLoaded] = result;
                console.log(brand, counterLoaded)
            })
            type[counter] = getParam(item.typeID, "types")
            type[counter].then(function(result) {
                type[counterLoaded] = result;
            })
            name[counter] = getParam(item.nameID, "items")
            name[counter].then(function(result) {
                name[counterLoaded] = result;
            })
            size[counter] = getParam(item.sizeID, "clothing_sizes")
            size[counter].then(function(result) {
                size[counterLoaded] = result;
            })
            cond[counter] = getParam(item.condID, "conditions")
            cond[counter].then(function(result) {
                cond[counterLoaded] = result;
            })
            main_photo[counter] = item.main_photo
            description[counter] = item.description
            
            color[counter] = getParam(item.colorID, "basic_colors")
            color[counter].then(function(result) {
                color[counterLoaded] = result;

                counterLoaded += 1
                if(counterLoaded >= 2) {
                    for(i = 0; i < counterLoaded; i++) {

                        var itemViewSell = document.createElement('a')
                        var itemViewPhoto = document.createElement('div')
                        var itemViewText = document.createElement('div')
                        var itemViewName = document.createElement('div')
                        var mainPhoto = document.createElement('img')
                        var nameEl = document.createElement('h2')
                        var brandEl = document.createElement('h4')
                        var sizeEl = document.createElement('h3')
                        var condEl = document.createElement('h3')
                        var colorEl = document.createElement('h3')

                        itemViewSell.classList.add('itemView')
                        itemViewPhoto.classList.add('itemViewPhoto')
                        itemViewText.classList.add('itemViewText')
                        itemViewName.classList.add('itemViewName')
                        mainPhoto.classList.add('itemViewPhoto')

                        itemViewSell.href = "/items-to-sell-matches?id=1&brandID=1"
                        mainPhoto.src = "Img/" + main_photo[i]
                        nameEl.innerHTML = name[i]
                        brandEl.innerHTML = brand[i]
                        sizeEl.innerHTML = "Velikost: " + size[i]
                        condEl.innerHTML = "Stav: " + cond[i]
                        colorEl.innerHTML = "Barva: " + color[i]
                        console.log(description[i])

                        content.appendChild(itemViewSell)
                        itemViewSell.appendChild(itemViewPhoto)
                        itemViewSell.appendChild(itemViewText)
                        itemViewText.appendChild(itemViewName)
                        itemViewPhoto.appendChild(mainPhoto)
                        itemViewName.appendChild(nameEl)
                        itemViewText.appendChild(brandEl)
                        itemViewText.appendChild(sizeEl)
                        itemViewText.appendChild(condEl)
                        itemViewText.appendChild(colorEl)
                    }
                }
            })
            counter += 1
        }
    })
    .catch(function (error) {
        console.log("errorowhduhawdb");
        console.log(error);
    });
}

itemsToSellMatches = () => {
    axios.get('/items-to-sell-matches?userid=' + userID)
}

try {
    loadItemsBuy(1)
}
catch(error) {
    console.log(error);
}

try {
    loadItemsSell(1)
}
catch(error) {
    console.log(error);
}

try {
    itemsToBuyMatches()
}
catch(error) {
    console.log(error);
}

/* try {
    profileAddChangeAction()
}
catch(error) {
    console.log(error);
} */

getParam = (id, param) => {
    return axios.get('/getparam?id=' + id + '&param=' + param)

    .then(function (response) {
        var data = response.data

        for(item of data) {
            console.log(item.name)
            return item.name
        }

    })
    .catch(function (error) {
        console.log("errorowhduhawdb");
        console.log(error);
    });
}