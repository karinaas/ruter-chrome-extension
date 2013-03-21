function printTime(departures) {
    var deps = {};
    var listOfDepartures = [];

    var template = "<div id = 'content'><div id ='stopName'>{{stopName}}</div> <div id = 'newStop'>Velg nytt stoppested</div> {{#departures}} <div id = 'departure'> <span id = 'lineId'>{{LineRef}} {{DestinationName}}</span> {{{cleanedDate aimedDepartureTime}}} </div> {{/departures}} <div id = 'scroll'> {{scroll}} </div></div>";

    for (var i = 0; i < 10; i++) {
        listOfDepartures.push({
            aimedDepartureTime : departures[i].AimedDepartureTime,
            DestinationName :  departures[i].DestinationName,
            LineRef : departures[i].LineRef
        });
    }

    deps["stopName"] = localStorage.stopName;
    deps["departures"] = listOfDepartures;

    Handlebars.registerHelper('cleanedDate', function(date) {
        var cleanedDate =  createDateString(date);
        var date = new Date();
        date.setTime(cleanedDate);     
        var timeUntilDeparture = getTimeUntilDeparture(date);   
        return new Handlebars.SafeString(
            "<span id = 'counter' data-date-id="+cleanedDate+">"+ (checkIfOneMinuteLeft(timeUntilDeparture) ? "n&aring;" : createMinutes(timeUntilDeparture))+"</span>"
        );
    });

    Handlebars.registerHelper('scroll', function(date) {
        var cleanedDate = createDateString(departures[10].AimedDepartureTime);
        var date = new Date();
        date.setTime(cleanedDate);
        return departures[10].LineRef + " " + departures[10].DestinationName + " " + date.getHours() + ":" + date.getMinutes();
    });

    var compiledTemplate = Handlebars.compile(template);
    var html = compiledTemplate(deps);

    document.querySelector("#overlay").innerHTML=html;

    var newStop = document.getElementById("newStop");

    newStop.addEventListener("click", function() {                    
        document.getElementById("overlay").removeChild(document.getElementById("content"));
        getPosition();                    
    }); 

    var list = document.querySelectorAll("#counter");

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
    var timeUntilDeparture = getTimeUntilDeparture(date);    
    if (checkIfOneMinuteLeft(timeUntilDeparture)) {
        element.innerHTML = "n&aring;"
    } else {       
        element.innerHTML = createMinutes(timeUntilDeparture);
    }
}

function getTimeUntilDeparture(date) {
    var dateNow = new Date();
    return date - dateNow.getTime();    
}

function checkIfOneMinuteLeft(timeUntilDeparture) {
    if (timeUntilDeparture <= 60000) {
        return true;
    }    
}

function createMinutes(amount) {
    var out = "";

    amount = Math.floor(amount / 1000);
    amount = amount % 3600;

    var minutes = Math.floor(amount / 60);//minutes
    amount = amount % 60;

    var seconds = Math.floor(amount);//seconds

    out += minutes + " " + "min";
    return out;

}

function createDateString(date) {
    return date.replace("/Date(", "").replace("+0100)/", "");
}