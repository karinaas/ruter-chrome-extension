function printTime(departures) {
    var list = [];
    var index = 10;

    if (departures.length < 11) {
        index = departures.length;
    }

    var content = document.createElement("div");
    content.setAttribute("id", "content");
    document.querySelector("#overlay").appendChild(content);

    var stop = document.createElement("div");
    stop.setAttribute("id", "stopName");
    stop.innerHTML = localStorage.stopName;
    document.querySelector("#content").appendChild(stop);

    var selectNewStop = document.createElement("div");
    selectNewStop.setAttribute("id", "newStop");
    selectNewStop.innerHTML = "Velg nytt stoppested";

    selectNewStop.addEventListener("click", function() {
        document.getElementById("overlay").removeChild(document.getElementById("content"));
        getPosition();
    });

    document.querySelector("#content").appendChild(selectNewStop);

    for (var i = 0; i < index; i++) {

        var departure = document.createElement("div");
        departure.setAttribute("id", "departure");

        var lineId = document.createElement("span");
        lineId.setAttribute("id", "lineId");

        var counter = document.createElement("span");
        counter.setAttribute("id", "counter");

        departure.appendChild(lineId);
        departure.appendChild(counter);

        list[i] = departure;

        document.querySelector("#content").appendChild(departure);

        var dateSubstr = createDateString(departures[i].AimedDepartureTime);
        var date = new Date();
        date.setTime(dateSubstr);
        interval(date, list[i]);

        list[i].childNodes[0].innerHTML = +departures[i].LineRef + " " + departures[i].DestinationName;
    }

    if (list.length < departures.length) {
        var scroll = document.createElement("div");
        scroll.setAttribute("id", "scroll");
        document.querySelector("#content").appendChild(scroll);

        var nextDateString = createDateString(departures[7].AimedDepartureTime);
        var nextDate = new Date();
        nextDate.setTime(nextDateString);

        document.getElementById("scroll").innerHTML = departures[list.length + 1].LineRef + " " + departures[list.length + 1].DestinationName + " " + nextDate.getHours() + ":" + nextDate.getMinutes();
    }

}

function interval(date, element) {
    var interval = setInterval(function() {
        count(date, element)
    }, 1000);
}

function count(date, element) {
    var dateNow = new Date();
    var amount = date - dateNow.getTime();

    //if less then a minute to go just print "nå"
    if (amount <= 60000) {
        element.childNodes[1].innerHTML = "n&aring;"
    }

    else {
        var out = "";

        amount = Math.floor(amount / 1000);
        amount = amount % 3600;

        var minutes = Math.floor(amount / 60);//minutes
        amount = amount % 60;

        var seconds = Math.floor(amount);//seconds

        out += minutes + " " + "min";

        element.childNodes[1].innerHTML = out;
    }
}

function createDateString(date) {
    return date.replace("/Date(", "").replace("+0100)/", "");
}


