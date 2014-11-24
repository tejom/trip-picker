module.exports = {

	generateCodeString: function(arr){
		var codeString = '';
		for(key in arr){
			codeString=codeString+'|'+arr[key];
		}
		codeString=codeString.substring(1);
		return codeString;
	},


	findAirport: function(city,callback){
	$.ajax({
		url: "https://airport.api.aero/airport/match/" + city + "?user_key=9638a0f3d8ab35bb6e22f060025d279a",
		success:function(data){
			console.log(data);
			return callback(data.airports);
			},
		dataType: 'jsonp'

	});
	},

	findPrice: function(fromLocation,toLocation,callback){
		fromString=this.generateCodeString(fromLocation);
		toString=this.generateCodeString(toLocation);
		console.log(fromString);

		$.ajax({
			url: "http://api.hotwire.com/v1/tripstarter/air?apikey=7ej9nc82g5vcbymtqdbb2csw&origin="+fromString+"&dest="+toString+"&format=jsonp&sort=price&sortorder=asc",
			success: function(data){
				callback(data.Result[0])
				console.log(data);
			},
			dataType: 'jsonp'
		});
	}

}