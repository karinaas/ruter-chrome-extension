function getTimeUntilDeparture(date) {
    var dateNow = new Date();
    return date - dateNow.getTime();
}

function checkIfOneMinuteLeft(timeUntilDeparture) {
    return timeUntilDeparture <= 60000;
}

function checkIfMoreThanTwentyMinutesLeft(timeUntilDeparture) {
    return timeUntilDeparture >= 1200000;
}

function checkIfOneMinutePastDeparture(timeUntilDeparture) {
    return timeUntilDeparture <= -60000;
}

function createMinutes(amount) {
    var out = "";

    amount = Math.floor(amount / 1000);
    amount = amount % 3600;

    var minutes = Math.floor(amount / 60);//minutes
    //amount = amount % 60;

    //var seconds = Math.floor(amount);//seconds

    out += minutes + " " + "min";
    return out;

}

function fixMinutes(minutes) {
    return (minutes.toString().length == 1 ? "0"+minutes.toString() : minutes);
}