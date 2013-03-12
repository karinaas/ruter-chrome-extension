var xhr;

function run() {	
    console.log("stop in local storage: ", localStorage.stop)
    var url = "http://reis.trafikanten.no/reisrest/realtime/getrealtimedata/"+localStorage.stop;
    ProcessJson(url, processRealtime);
};

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
        listStops();
    }
}