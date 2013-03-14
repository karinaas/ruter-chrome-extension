function xhr() {
    var xhrObj = new XMLHttpRequest();
    return xhrObj;
}

function send (url, onSuccess) {
    var xhrRequest = xhr();

    xhrRequest.onreadystatechange = function onchange() {
        if (xhrRequest.readyState === 4 && xhrRequest.status == 200) {            
            onSuccess(JSON.parse(xhrRequest.responseText));
        }
    };

    xhrRequest.open("GET", url, true);
    xhrRequest.send(null);

}
