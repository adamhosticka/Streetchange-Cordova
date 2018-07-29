/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/* var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


app.initialize(); */

try {
    var wrapper = document.getElementById("swipe_layout_content");
    var currentX = 0;
    var windowWidth = screen.width;
    var innerDivs = document.getElementsByClassName('swipe_layout_div'); // Pro nastaveni overflow-y pri movingX
    var innerDivsLength = innerDivs.length;  // zatim neni nutno, kdyztak pouzit for i < innverdivslength - innerdivs[i].style...
    /* var wrapperWidth = screen.width*4; */
    var wrapperWidth = screen.width*innerDivsLength;
    var swipeAble = windowWidth*0.5;
    var theDiff = 0;

    wrapper.addEventListener('touchstart', wrapperTouchstart, false);
    wrapper.addEventListener('touchmove', wrapperTouchmove, false);
    wrapper.addEventListener('touchend', wrapperTouchend, false);

    function wrapperTouchstart(event) {
        touchStartX = event.changedTouches[0].clientX;
        touchStartY = event.changedTouches[0].clientY;
        movedX = false;
        movedY = false;
        wrapper.style.transition = "0s";
    }

    function wrapperTouchmove(event) {
        touchMoveX = event.changedTouches[0].clientX;
        touchMoveY = event.changedTouches[0].clientY;

        theDiff = touchStartX - touchMoveX;
        translateX = -theDiff + currentX;

        if((touchStartY <= touchMoveY - 8 || touchStartY >= touchMoveY + 8) && movedX !== true) {
            movedY = true;
        } else if((touchStartX <= touchMoveX - 8 || touchStartX >= touchMoveX + 8) && movedY !== true) {
            movedX = true;
        }

        if(translateX < 0 && translateX > -windowWidth*(innerDivsLength-1) && theDiff > -windowWidth && theDiff < windowWidth && !movedY) {    // (innerDivsLength-1) bylo 3
            wrapper.style.transform = "translateX(" + translateX + "px)";
        }
    }

    function wrapperTouchend(event) {
        wrapper.style.transition = "0.5s";
        
        if(-theDiff+currentX < currentX - swipeAble && theDiff > 0 && currentX-windowWidth >= -windowWidth*(innerDivsLength-1)) {
            wrapper.style.transform = "translateX(" + (currentX-windowWidth) + "px)";
            currentX = currentX - windowWidth;
        } else if(-theDiff+currentX > currentX + swipeAble && theDiff < 0 && currentX+windowWidth <= 0) {
            wrapper.style.transform = "translateX(" + (currentX + windowWidth) + "px)";
            currentX = currentX + windowWidth;
        } else {
            wrapper.style.transform = "translateX(" + currentX + "px)";
        }

        /* if(-currentX / windowWidth == 0) {topMenuActive("lc_a")}
        if(-currentX / windowWidth == 1) {topMenuActive("ic_a")}
        if(-currentX / windowWidth == 2) {topMenuActive("id_a")}
        if(-currentX / windowWidth == 3) {topMenuActive("pc_a")} */

        for(var i = 0; i < innerDivsLength; i++) {
            if(-currentX / windowWidth === i) {
                topMenuActive(i);
            }
        }

        theDiff = 0;
    }

    /* document.getElementById("lc_a").addEventListener("click", function(){topMenuActive("lc_a")})
    document.getElementById("ic_a").addEventListener("click", function(){topMenuActive("ic_a")})
    document.getElementById("id_a").addEventListener("click", function(){topMenuActive("id_a")})
    document.getElementById("pc_a").addEventListener("click", function(){topMenuActive("pc_a")}) */

    for(var i = 0; i < innerDivsLength; i+= 1) {
        (function(i) {
            document.getElementsByClassName('top_menu_transition')[i].addEventListener("click", function() {topMenuActive(i)}, false);
        }(i));
    }
    
    function topMenuActive(id) {
        for(var i = 0; i < innerDivsLength; i++) {
            document.getElementsByClassName('top_menu_transition')[i].classList.remove('top_menu_active');
        }
        document.getElementsByClassName('top_menu_transition')[id].classList.add('top_menu_active');

        wrapper.style.transition = "0.5s";
        currentX = id*(-windowWidth); 
        document.getElementById("swipe_layout_content").style.transform = "translate3d("+ currentX +"px, 0px, 0px)";
    }

    /* function topMenuActive(id) {
        document.getElementById("lc_a").classList.remove('top_menu_active');
        document.getElementById("ic_a").classList.remove('top_menu_active');
        document.getElementById("id_a").classList.remove('top_menu_active');
        document.getElementById("pc_a").classList.remove('top_menu_active');
        document.getElementById(id).classList.add('top_menu_active');
        wrapper.style.transition = "0.5s";

        if(id == "lc_a") {
            document.getElementById("swipe_layout_content").style.transform = "translate3d(0, 0px, 0px)";
            currentX = 0;
        } else if(id == "ic_a") {
            document.getElementById("swipe_layout_content").style.transform = "translate3d(-25%, 0px, 0px)";
            currentX = -windowWidth;
        } else if(id == "id_a") {
            document.getElementById("swipe_layout_content").style.transform = "translate3d(-50%, 0px, 0px)";
            currentX = -2*windowWidth;
        } else if(id == "pc_a") {
            document.getElementById("swipe_layout_content").style.transform = "translate3d(-75%, 0px, 0px)";
            currentX = -3*windowWidth;
        }
    } */

    /* document.getElementById("lc_a").addEventListener("click", function() {
        document.getElementById("swipe_layout_content").style.transform = "translate3d(0, 0px, 0px)";
        document.getElementById("lc_a").classList.add('top_menu_active');
        document.getElementById("ic_a").classList.remove('top_menu_active');
        document.getElementById("id_a").classList.remove('top_menu_active');
        document.getElementById("pc_a").classList.remove('top_menu_active');
        currentX = 0;
    });
    
    document.getElementById("ic_a").addEventListener("click", function() {
        document.getElementById("swipe_layout_content").style.transform = "translate3d(-25%, 0px, 0px)";
        document.getElementById("lc_a").classList.remove('top_menu_active');
        document.getElementById("ic_a").classList.add('top_menu_active');
        document.getElementById("id_a").classList.remove('top_menu_active');
        document.getElementById("pc_a").classList.remove('top_menu_active');
        currentX = -windowWidth;
    });

    document.getElementById("id_a").addEventListener("click", function() {
        document.getElementById("swipe_layout_content").style.transform = "translate3d(-50%, 0px, 0px)";
        document.getElementById("lc_a").classList.remove('top_menu_active');
        document.getElementById("ic_a").classList.remove('top_menu_active');
        document.getElementById("id_a").classList.add('top_menu_active');
        document.getElementById("pc_a").classList.remove('top_menu_active');
        currentX = -2*windowWidth;
    });
    
    document.getElementById("pc_a").addEventListener("click", function() {
        document.getElementById("swipe_layout_content").style.transform = "translate3d(-75%, 0px, 0px)";
        document.getElementById("lc_a").classList.remove('top_menu_active');
        document.getElementById("ic_a").classList.remove('top_menu_active');
        document.getElementById("id_a").classList.remove('top_menu_active');
        document.getElementById("pc_a").classList.add('top_menu_active');
        currentX = -3*windowWidth;
    }); */
}
catch(error) {
    console.error(error);
}

try {
document.getElementById('information_icon').addEventListener("click", function(){
        document.getElementById('information_div').style.zIndex = "999999";
        document.getElementById('shadow_div').style.zIndex = "99999";
        document.getElementById('shadow_div').style.opacity = "0.5";
    });
 
document.getElementById("closeInformationDiv").addEventListener("click", function(){
        document.getElementById('information_div').style.zIndex = "-99";
        document.getElementById('shadow_div').style.zIndex = "-999";
        document.getElementById('shadow_div').style.opacity = "0";
    });
 
    document.getElementById('shadow_div').addEventListener("click", function(){
        document.getElementById('information_div').style.zIndex = "-99";
        document.getElementById('shadow_div').style.zIndex = "-999";
        document.getElementById('shadow_div').style.opacity = "0";
    });
}
catch(error) {
    console.log(error);
}

try {
    document.getElementById('filterImg').addEventListener("click", function(){
        document.getElementById('right_menu').style.transform = "translateX(0%)";
        document.getElementById('shadow_div').style.zIndex = "99999";
        document.getElementById('shadow_div').style.opacity = "0.5";
    });

    document.getElementById("closeRightMenu").addEventListener("click", function(){
        document.getElementById('right_menu').style.transform = "translateX(100%)";
        document.getElementById('shadow_div').style.zIndex = "-999";
        document.getElementById('shadow_div').style.opacity = "0";
    });

    document.getElementById('shadow_div').addEventListener("click", function(){
        document.getElementById('right_menu').style.transform = "translateX(100%)";
        document.getElementById('shadow_div').style.zIndex = "-999";
        document.getElementById('shadow_div').style.opacity = "0";
    });
}
catch(error) {
    console.error(error);
}


try {
    document.getElementById('addToFavouriteImg').addEventListener("click", function(){
        if(document.getElementById('addToFavouriteImg').src === "http://localhost:8000/Img/favourite.png") {
            document.getElementById('addedToFavouriteMessage').style.display = 'inline-table';
            setTimeout(function(){
                document.getElementById('addedToFavouriteMessage').style.background = 'rgba(100,100,100, 0.7)';
            },0.00000000000000000000000000000000000000000000000000000000000001);
            setTimeout(function(){
                document.getElementById('addedToFavouriteMessage').style.background = 'rgba(100,100,100, 0.2)';
            }, 1300); 
            setTimeout(function(){
                document.getElementById('addedToFavouriteMessage').style.display = "none";
            }, 1500); 
        }
    }); 
}
catch(error) {
    console.error(error);
}

try {
    document.getElementById('addToFavouriteImg').addEventListener("click", function(){
        if(document.getElementById('addToFavouriteImg').src === "http://localhost:8000/Img/favourite.png") {
            document.getElementById('addToFavouriteImg').src = "http://localhost:8000/Img/favouriteAdded.png";
        }
        else {
            document.getElementById('addToFavouriteImg').src = "http://localhost:8000/Img/favourite.png";
        }
    });
}

catch(error) {
    console.log(error);
}

try {
    document.getElementById('brand_select').addEventListener("click", function(){
        document.getElementById('right_menu_filter').style.display = "none";
        document.getElementById('select_right_menu').style.display = "block";
        document.getElementById('right_menu_header_filter').style.display = "none";
        document.getElementById('right_menu_header_select').style.display = "block";
    });

    document.getElementById('filter_back').addEventListener("click", function(){
        document.getElementById('right_menu_filter').style.display = "block";
        document.getElementById('select_right_menu').style.display = "none";
        document.getElementById('right_menu_header_filter').style.display = "block";
        document.getElementById('right_menu_header_select').style.display = "none";
    });
}

catch(error) {
    console.log(error);
}

var menu = new TouchSideSwipe({
    elementID: 'menu',
    elementWidth: 3000,
    elementMaxWidth: 0.8,
    sideHookWidth: 44,
    moveSpeed: 0.2,
    opacityBackground: 0.5,
    shiftForStart: 70,
    windowMaxWidth: 2000,
    sideHookWidth: 30,
});

/* document.getElementById('menuButton').addEventListener("click", showMenu);
function showMenu() {
    document.getElementById("menu").classList.remove('horizTranslateBack');
    document.getElementById("menu").classList.add('horizTranslate');
    document.getElementById("shadowDiv").classList.remove('fadeOut');
    document.getElementById("shadowDiv").classList.add('fadeIn');
    document.getElementById('shadowDiv').style.display = "block";
}   

document.getElementById('shadowDiv').addEventListener("click", hideMenu);  
function hideMenu() {
    document.getElementById("menu").classList.remove('horizTranslate');
    document.getElementById("menu").classList.add('horizTranslateBack');
    document.getElementById("shadowDiv").classList.remove('fadeIn');
    document.getElementById("shadowDiv").classList.add('fadeOut');
    setTimeout(function(){
        document.getElementById('shadowDiv').style.display = "none";
    }, 300); 
} */

$callOut = false;
/* if($callOut) {
    document.getElementById('callOutWarning').style.display = 'block';
    if($('#callOutWarning').is(':visible')) {
        document.getElementById('content').classList.add('callOutWarningActive');
    }
} */

if($callOut) {
    document.getElementById('callOutWarning').style.display = 'block';
    if(document.getElementById('callOutWarning').style.display === 'block') {
        document.getElementById('content').classList.add('callOutWarningActive');
    }
}