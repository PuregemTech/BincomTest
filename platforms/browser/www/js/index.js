App.controller('home', function (page) {
    // put stuff here

});

App.controller('create', function (page) {
    // put stuff here
});

try {
    App.restore();
} catch (err) {
    App.load('home');
}

const btn = document.getElementById("cameraTakePicture");
if (btn) {
    btn.addEventListener('click', cameraTakePicture);
  }

//Camera js code
//document.getElementById("cameraTakePicture").addEventListener 
//   ("click", cameraTakePicture); 

   function cameraTakePicture(e) { 
    //e.preventDefault();
    navigator.camera.getPicture(onSuccess, onFail, {  
       quality: 50, 
       destinationType: Camera.DestinationType.DATA_URL 
    });  
    
    function onSuccess(imageData) { 
       var image = document.getElementById('myImage'); 
       image.src = "data:image/jpeg;base64," + imageData; 
    }  
    
    function onFail(message) { 
       alert('Failed because: ' + message); 
    } 
 }

//Geolocation js code
const getPos = document.getElementById("getPosition");
const watchPos = document.getElementById("watchPosition");
if (getPos) {
    getPos.addEventListener('click', getPosition);
  }

if (watchPos) {
    watchPos.addEventListener('click', watchPosition);
}
//document.getElementById("getPosition").addEventListener("click", getPosition);
//document.getElementById("watchPosition").addEventListener("click", watchPosition);


function getPosition() {
    var options = {
       enableHighAccuracy: true,
       maximumAge: 3600000
    }
    var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
 
    function onSuccess(position) {
       alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
    };
 
    function onError(error) {
       alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
    }
 }
 
 function watchPosition() {
    var options = {
       maximumAge: 3600000,
       timeout: 3000,
       enableHighAccuracy: true,
    }
    var watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
 
    function onSuccess(position) {
       alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
    };
 
    function onError(error) {
       alert('code: '    + error.code    + '\n' +'message: ' + error.message + '\n');
    }
 }


//function to clear textarea field after submit
function ClearFields() {
   // document.getElementById("title").value = "";
    document.getElementById("content").value = "";
}

$(document).ready(function () {
    var rootUrl = 'https://puregem-blog.000webhostapp.com';
    
    const url = `${rootUrl}/wp-json/wp/v2/posts`;
    
    var tokenUrl = `${rootUrl}/wp-json/jwt-auth/v1/token`;
    
    var adminDet = {
    username: "admin",
    password: "PureGem04.",
    }; 
    
    var token;
    loadData();
    
    $.post(tokenUrl, adminDet,
        function (data, status) {
        //console.log("token: " + data.token);
        token = data.token;
    });
    
    
    function loadData() {
        $.getJSON(url, function (data) {
            //console.log(data);

            
            $("#spinner").remove();
            
            $("#mainDiv").empty();
            
            for (var i = 0; i < data.length; i++) {
                var div = document.createElement('div');
                div.innerHTML = `
                <div class="card pt-1">
                    <div class="card-body">
                        <h4 class="card-title">${data[i].title.rendered}</h4>
                        <p class="card-text text-wrap">${data[i].content.rendered}</p>
                    </div>
                </div>`;
                $("#mainDiv").append(div);
            };
        });
    }
    
    $('form').submit(function (event) {
    //$("#submitButton").click(function(event) {
        
        event.preventDefault();
        var formData = {
            //title: $('input[name=title]').val(),
            title: $('#incident').val(),
            content: $('textarea[name=content]').val(),  
            status: 'publish',
        };

        console.log(formData);
        $.ajax({
            url: url,
            method: 'POST',
            data: JSON.stringify(formData),
            crossDomain: true,
            contentType: 'application/json',
            headers: {
            Authorization: 'Bearer ' + token
            },
            success: function (data) {
                console.log(data);
                loadData();
            },
            error: function (error) {
                console.log(error);
            }
        });
        ClearFields();
    });
});
