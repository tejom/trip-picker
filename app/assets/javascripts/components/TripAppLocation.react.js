var React = require('react');
var AppActions = require('../actions/AppActions');

var TripAppLocation = React.createClass({

	cities: [
			"New York City",
			"Chicago",
			"Los Angeles",
			"Boston",
			"Miami",
			"Atlanta",
			"Denver",
			
		],

	componentDidMount: function() {
		var locationInput = this.refs.locationInput.getDOMNode();
		$(locationInput).autocomplete({
		 	source: this.cities
		 });
		
	},

	render: function(){

		return(
		<div>
		<h2> Whats your location</h2>
		<input id='location-input' ref='locationInput' onBlur={this._save}/>
		</div>
		);
	},

	_save: function(event){
		var newLocation = event.target.value;
		console.log('text' + newLocation);
		AppActions.updateLocation(newLocation);
	}

});

module.exports = TripAppLocation;