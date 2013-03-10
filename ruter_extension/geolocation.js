navigator.geolocation.getCurrentPosition(showPosition);

function showPosition(position) { 
  	var lat = position.coords.latitude; 
	var long = position.coords.longitude; 
	var latLng = new LatLng(lat, long); 
	var utm = latLng.toUTMRef();
		
	var X = utm.easting.toString().split(".")[0];	
	var Y = utm.northing.toString().split(".")[0];	

	console.log("X: ", X);
	console.log("Y: ", Y);

	var url = "http://api-test.trafikanten.no/Place/GetClosestStopsByCoordinates/?coordinates=(X="+X+",Y="+Y+")&proposals=4"
	ProcessJson(url, processClosestStops);
}

function findStops() {
	var data = JSON.parse(xhr.responseText);	
	for (key in data) {
		console.log("KEY: ", data[key]);
	}
}