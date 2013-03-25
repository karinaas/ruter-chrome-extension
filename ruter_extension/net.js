function xhr() {
    var xhrObj = new XMLHttpRequest();
    return xhrObj;
}

function send (url, onSuccess, onProgress) {
    var xhrRequest = xhr();

    xhrRequest.onreadystatechange = function onchange() {
        onProgress(true);
        if (xhrRequest.readyState === 4 && xhrRequest.status == 200) {
            onProgress(false);
            onSuccess(JSON.parse(xhrRequest.responseText));
        }
    };

    xhrRequest.open("GET", url, true);
    xhrRequest.send(null);

}
