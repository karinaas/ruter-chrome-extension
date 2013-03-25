function getPosition() {
    navigator.geolocation.getCurrentPosition(showPosition);
}

getPosition();

function showPosition(position) {
    var lat = position.coords.latitude; 
    var long = position.coords.longitude; 
    var latLng = new LatLng(lat, long); 
    var utm = latLng.toUTMRef();
        
    var X = utm.easting.toString().split(".")[0];   
    var Y = utm.northing.toString().split(".")[0];      

    var url = "http://api-test.trafikanten.no/Place/GetClosestStopsByCoordinates/?coordinates=(X="+X+",Y="+Y+")&proposals=100"
    var testUrl = "http://api-test.trafikanten.no/Place/GetClosestStopsByCoordinates/?coordinates=(X=597982,Y=6643115)&proposals=100";  

    send(url,
        
        function success (obj) {
            listStops(obj)
        },

        function progress(status) {
            if (!status) {
                document.querySelector("#spinner").style.display = "none";
            }
        }
    );
}

function listStops(data) {
    
    var select = document.createElement("select");
    select.setAttribute("name", "stops");
    select.setAttribute("id", "stops");
    select.style.width = "200px";       

    var option;
    option = document.createElement("option");
    option.innerHTML = "VELG STOPPESTED";
    select.appendChild(option);

    for (key in data) {
        option = document.createElement("option");
        option.setAttribute("value", data[key].ID);
        option.innerHTML = data[key].Name;
        select.appendChild(option);
    }   

    var overlay = document.getElementById("overlay");
    overlay.appendChild(select);            

    select.onchange = function() {
        setStopInLocalStorage();    
        var selectElement = document.getElementById("stops");           
        document.getElementById("overlay").removeChild(selectElement);
        
        send("http://reis.trafikanten.no/reisrest/realtime/getrealtimedata/"+localStorage.stopId,
        
            function success(obj) {
                printTime(obj)
            },

            function progress(status) {
                if (status) {
                    document.querySelector("#spinner").style.display = "block";
                } else {
                    document.querySelector("#spinner").style.display = "none";
                }
            }
        );
    };
}

function setStopInLocalStorage() {
    var selectElement = document.getElementById("stops");
    localStorage.stopId = selectElement.options[selectElement.selectedIndex].value; 
    localStorage.stopName = selectElement.options[selectElement.selectedIndex].innerHTML;       
}