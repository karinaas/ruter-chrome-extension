function printTime(departures) {
    var deps = {};
    var listOfDepartures = [];
    var index = 12;

    if (departures.length < index) {
        index = departures.length;
    }

    var template = "<div id = 'content'><div id ='stopName'>{{stopName}}</div> <div id = 'newStop'>Velg nytt stoppested</div> {{#departures}} <div class = 'departure'> <span class = 'lineId'>{{LineRef}} {{DestinationName}}</span> <span class = 'counter' data-date-id={{aimedDepartureTime}}>{{{timeUntilDeparture aimedDepartureTime}}}</span> </div> {{/departures}}</div>";

    for (var i = 0; i < index; i++) {
        listOfDepartures.push({
            aimedDepartureTime : createDateString(departures[i].AimedDepartureTime),
            DestinationName :  departures[i].DestinationName,
            LineRef : departures[i].LineRef
        });
    }

    deps["stopName"] = "Fra " +localStorage.stopName;
    deps["departures"] = listOfDepartures;

    Handlebars.registerHelper('timeUntilDeparture', function(cleanedDate) {
        var date = new Date();
        date.setTime(cleanedDate);
        var timeUntilDeparture = getTimeUntilDeparture(date);
        if (checkIfMoreThanTwentyMinutesLeft(timeUntilDeparture)) {
            return date.getHours() + ":" + fixMinutes(date.getMinutes());
        } else {
            return (checkIfOneMinuteLeft(timeUntilDeparture) ? "n&aring;" : createMinutes(timeUntilDeparture))
        }
    });

    /*if (listOfDepartures.length < departures.length) {
        Handlebars.registerHelper('scroll', function(date) {
            var cleanedDate = createDateString(departures[listOfDepartures.length+1].AimedDepartureTime);
            var date = new Date();
            date.setTime(cleanedDate);
            return departures[listOfDepartures.length+1].LineRef + " " + departures[listOfDepartures.length+1].DestinationName + " " + date.getHours() + ":" + date.getMinutes();
        });
    }*/

    var compiledTemplate = Handlebars.compile(template);
    var html = compiledTemplate(deps);

    document.querySelector("#overlay").innerHTML+=html;

    addClickEvent();
    addInterval();
}

function addClickEvent() {
    var newStop = document.getElementById("newStop");

    newStop.addEventListener("click", function() {
        document.getElementById("overlay").removeChild(document.getElementById("content"));
        document.querySelector("#spinner").style.display = "block";
        getPosition();
    });
}

function addInterval() {
    var list = document.querySelectorAll(".counter");

    for (var i = 0; i < list.length; i++) {
        interval(list[i].getAttribute("data-date-id"), list[i])
    }
}

function interval(date, element) {
    var interval = setInterval(function() {
        count(date, element)
    }, 60000);
}

function count(date, element) {
    var thisDate = new Date();
    thisDate.setTime(date);
    var timeUntilDeparture = getTimeUntilDeparture(date);
    checkIfOneMinutePastDeparture(timeUntilDeparture, element);
    if (checkIfOneMinuteLeft(timeUntilDeparture)) {
        element.innerHTML = "n&aring;"
    } else if (checkIfMoreThanTwentyMinutesLeft(timeUntilDeparture)) {
        return thisDate.getHours() + ":" + fixMinutes(thisDate.getMinutes());
    } else {
        element.innerHTML = createMinutes(timeUntilDeparture);
    }
}

function createDateString(date) {
    return date.replace("/Date(", "").replace("+0200)/", "");
}