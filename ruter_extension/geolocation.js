navigator.geolocation.getCurrentPosition(showPosition);

function showPosition(position) { 
  	var lat = position.coords.latitude; 
	var long = position.coords.longitude; 
	var latLng = new LatLng(lat, long); 
	var utm = latLng.toUTMRef();
		
	var X = utm.easting.toString().split(".")[0];	
	var Y = utm.northing.toString().split(".")[0];		

	var url = "http://api-test.trafikanten.no/Place/GetClosestStopsByCoordinates/?coordinates=(X="+X+",Y="+Y+")&proposals=4"
	var testUrl = "http://api-test.trafikanten.no/Place/GetClosestStopsByCoordinates/?coordinates=(X=597982,Y=6643115)&proposals=100";	

	send(testUrl,
        
        function success(obj) {
        	listStops(obj)
		}
	);
}

function listStops(data) {
	
	var select = document.createElement("select");
   	select.setAttribute("name", "stops");
   	select.setAttribute("id", "stops");
   	select.style.width = "200px";

   	var option;

   	for (key in data) {
	   	option = document.createElement("option");
	  	option.setAttribute("value", data[key].ID);
	  	option.innerHTML = data[key].Name;
	  	select.appendChild(option);
	}	

	var overlay = document.getElementById("overlay");
	overlay.appendChild(select);	

	setStopInLocalStorage();		

	select.onchange = function() {
		setStopInLocalStorage();	
		var selectElement = document.getElementById("stops");			
		selectElement.style.display = "none";
		
		send("http://reis.trafikanten.no/reisrest/realtime/getrealtimedata/"+localStorage.stop,
        
	        function success(obj) {
	        	printTime(obj)
			}
		);
	};
}

function setStopInLocalStorage() {
	var selectElement = document.getElementById("stops");
	localStorage.stop = selectElement.options[selectElement.selectedIndex].value;		
}