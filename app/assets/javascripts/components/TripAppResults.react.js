var React = require('react');
var AppActions = require('../actions/AppActions');
var AirSearch = require('../util/AirSearch');

var TEST_MATCH = 'Miami'

var resultInfo = {
	bestCityMatch:'',
	resultAirportCode: [ ],
	tripPrice:'',
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
		this._getResults();
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
			<h3> Your best city is {this.state.bestCityMatch}</h3>
			<p> Average price of a  flight from {this.state.originCode} to {this.state.destCode} is {this.state.tripPrice}</p>
			<button onClick={this.resetApp}> Find A new Trip</button>
			</div>
			);
		}
	},

	_getResults: function(){
		this._getBestMatch(
			this._findAirportCodes
			);
		
		
	},

	_getBestMatch: function(callback){
		this.setState( { bestCityMatch: TEST_MATCH});
		callback();
	},

	_findAirportCodes: function (){
		AirSearch.findAirport(TEST_MATCH,this._setAirportCode);
		

	},
	_setAirportCode: function (data){
		var codeList =[];
		for(key in data){
			codeList.push(data[key].code);
		}

		this.setState({resultAirportCode: codeList});
		console.log(this.state.resultAirportCode);
		this._findPrice();

		
	},

	_findPrice: function (){
		var airportFromList = this.props.location.airportCode;
		var airportCodeList = [];
		for(key in airportFromList){
			airportCodeList.push(airportFromList[key].code);
		}
		AirSearch.findPrice(airportCodeList,this.state.resultAirportCode,this._setTripInfo);
		
	},
	_setTripInfo: function (data){
		console.log(data);
		this.setState({tripPrice: data.AveragePrice,
						originCode: data.OrigAirportCode,
						destCode: data.DestinationAirportCode,
						ready:true
					});
	}

});

module.exports = TripAppResults;


