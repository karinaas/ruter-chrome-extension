function printTime() {
	
	var json = JSON.parse(xhr.responseText);
	cityDepartures(json);

	var dateSubstr = createDateString(city[0].AimedDepartureTime);
	var date = new Date();
	date.setTime(dateSubstr);			

	document.getElementById("lineId").innerHTML=+city[0].LineRef + " " +city[0].DestinationDisplay;	
	count(dateSubstr);

	var nextDateString = createDateString(city[1].AimedDepartureTime);
	var nextDate = new Date();
	nextDate.setTime(nextDateString);

	document.getElementById("scroll").innerHTML = city[1].LineRef + " " +city[1].DestinationDisplay + " " +nextDate.getHours()+ ":"+nextDate.getMinutes();	
	
}

function count(date){			
	var dateNow = new Date();
	var amount = date - dateNow.getTime();

	//if less then a minute to go just print "nå"
	if(amount <= 60000){		
		document.getElementById("counter").innerHTML="n&aring;"
	}

	else{	
		var out = "";

		amount = Math.floor(amount/1000);		
		amount = amount%3600;
		
		var minutes = Math.floor(amount/60);//minutes
		amount = amount%60;

		var seconds = Math.floor(amount);//seconds		
		
		out += minutes +" "+"min";		
		document.getElementById("counter").innerHTML=out;

		setTimeout(function(){count(date)}, 1000);	
	}
}

var city = [];

function cityDepartures(data) {
	for (key in data) {
		if (data[key].DirectionName == 2) {
			city.push({
				AimedDepartureTime : data[key].AimedDepartureTime,
				DestinationDisplay : data[key].DestinationDisplay,
				LineRef : data[key].LineRef
			})
		}
	}
}

function createDateString(date) {	
	return date.replace("/Date(", "").replace("+0100)/", "");
}


