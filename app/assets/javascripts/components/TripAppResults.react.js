var React = require('react');
var AppActions = require('../actions/AppActions');
var AirSearch = require('../util/AirSearch');

var TEST_MATCH = 'Miami'

var resultInfo = {
	bestCityMatch:'',
	resultAirportCode: [ ],
	tripPrice:9999,
	originCode:'',
	destCode:'',
	ready:false

}

function getAllStates(){
	return resultInfo;
}



var TripAppResults = React.createClass({
	getInitialState: function(){
		return getAllStates();				
	},

	componentDidMount: function(){
		this._getResults(this.props.wantedAttributes);
	},

	resetApp: function(){
		AppActions.resetApp();
	},

	render: function(){

		if(!this.state.ready){				//hide results until all are ready to be displayed
			return(
					<div className='location-container col-xs-12 col-md-6 col-md-offset-3 '>
						<div className="result">
							<div className='result-panel loading-panel panel panel-default'>
							<svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
						   <circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
						  	</svg>
						  	<h3> Loading...</h3>
						 </div>
					</div>
				</div>
				);
		}
		else{
		return(
			<div>
			<h2> Results</h2>
			<h3> Your best city is {this.state.resultCity}</h3>
			<p> Average price of a  flight from {this.state.originCode} to {this.state.destCode} is {this.state.tripPrice}</p>
			<button onClick={this.resetApp}> Find A new Trip</button>
			</div>
			);
		}
	},

	_getResults: function(traits){
		console.log('getting traits');
		console.log(traits);

		this._getBestMatch(
			this._findAirportCodes,
			traits
			);
		
		
	},

	_getBestMatch: function(callback,traits){
		this.setState( {currentCity : 0});
		url = '';

		for(var key in traits){
			url = url + 'trait[]=' + traits[key].value + '&';
		}
		url=url.substring(0,url.length-1);
		console.log(url);

		$.ajax({
			url: '/api/v1/citys/id?' + url,
			success: function(data){
				console.log(data);
				//this.setState( { bestCityMatch: TEST_MATCH});
				callback(data);
			}
		});
		
	},

	_findAirportCodes: function (data){
		this.setState( { bestCityMatch: data});

		for(var key in data){
			var current = this.state.currentCity + 1;
			this.setState( {currentCity : current});
			console.log(this.state.currentCity);
			AirSearch.findAirport(data[key],this._setAirportCode);
		}

		

	},
	_setAirportCode: function (city,data){
		var codeList =[];
		for(key in data){
			codeList.push(data[key].code);
		}
		

		//this.setState({resultAirportCode: cityState });
		//console.log(this.state.resultAirportCode);
		
		this._findPrice(city,codeList);

		
	},

	_findPrice: function (city,destinationList){
		console.log(city);
		console.log(destinationList);
		var airportFromList = this.props.location.airportCode;
		var airportCodeList = [];
		for(var key in airportFromList){
			airportCodeList.push(airportFromList[key].code);
		}
		console.log(airportCodeList);
		console.log(airportFromList);		
		AirSearch.findPrice(airportCodeList,destinationList,this._setTripInfo,city);
		
		
	},
	_setTripInfo: function (data,city){
		console.log(data);
		if(data){										//might get null data when there is an error from api
			if(data.AveragePrice< this.state.tripPrice){
				this.setState({	resultCity: city,
								tripPrice: data.AveragePrice,
								originCode: data.OrigAirportCode,
								destCode: data.DestinationAirportCode,
								
							});
				console.log(city + ' , ' + this.state.bestCityMatch[this.state.bestCityMatch.length-1]);
			}
		}

		if(city == this.state.bestCityMatch[this.state.bestCityMatch.length-1]){
			this.setState({ready:true});
		}
	}

});

module.exports = TripAppResults;


