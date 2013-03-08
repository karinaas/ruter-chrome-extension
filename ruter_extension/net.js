var xhr;

//Sørli: 3010830
var url = "http://reis.trafikanten.no/reisrest/realtime/getrealtimedata/3010830";
ProcessJson(url);

function ProcessJson(url) {		
	xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onreadystatechange = processChange;
	xhr.send(null);					
}

function processChange() {
	if (xhr.readyState == 4 && xhr.status == 200) {		 
		printTime();
	} 
}