var xhr;

(function run(){	
	var url = "http://reis.trafikanten.no/reisrest/realtime/getrealtimedata/3010830";
	ProcessJson(url, processRealtime);
})();

function ProcessJson(url, onchange) {		
	xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onreadystatechange = onchange;
	xhr.send(null);					
}

function processRealtime() {
	if (xhr.readyState == 4 && xhr.status == 200) {		 
		printTime();
	} 
}

function processClosestStops() {
	if (xhr.readyState == 4 && xhr.status == 200) {		 
		findStops();
	} 
}