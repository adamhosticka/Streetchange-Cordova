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
    document.getElementById('addToFavouriteImg').addEventListener("click", function(){
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
    });
}
catch(error) {
    console.error(error);
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