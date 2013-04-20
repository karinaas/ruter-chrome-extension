function getTimeUntilDeparture(date) {
    var dateNow = new Date();
    return date - dateNow.getTime();
}

function checkIfOneMinuteLeft(timeUntilDeparture) {
    if (timeUntilDeparture <= 60000) {
        return true;
    }
}

function checkIfMoreThanTwentyMinutesLeft(timeUntilDeparture) {
    if (timeUntilDeparture >= 1200000) {
        return true;
    }
}

function checkIfOneMinutePastDeparture(timeUntilDeparture, element) {
    if (timeUntilDeparture <= -60000) {
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

function fixMinutes(minutes) {
    return (minutes.toString().length == 1 ? "0"+minutes.toString() : minutes);
}