module.exports = {

	findAirport: function(city,callback){
	console.log('finding '+ city);
	$.ajax({
		url: "https://airport.api.aero/airport/match/" + city + "?user_key=9638a0f3d8ab35bb6e22f060025d279a",
		success:function(data){
			console.log(data.airports);
			callback(data.airports);
			},
		dataType: 'jsonp'
	});
}


}