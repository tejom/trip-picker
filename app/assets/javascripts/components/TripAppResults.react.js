var React = require('react');
var AppActions = require('../actions/AppActions');

var TEST_MATCH = 'Miami'

var _resultInfo = {
	bestCityMatch:'',
	resultAirportCode: [],
	tripPrice:''

}

var TripAppResults = React.createClass({


	render: function(){

		console.log(this.props.location);
		return(
			<div>
			<h2> Results</h2>
			{this.props.wantedAttributes}
			{this.props.location.airportCode[0]}
			</div>
			);
	}

});

module.exports = TripAppResults;


