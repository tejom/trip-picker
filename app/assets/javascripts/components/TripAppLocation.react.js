var React = require('react');
var AppActions = require('../actions/AppActions');
var LocationStore = require('../stores/LocationStore');


function getErrorState(){
	return {
		flash: LocationStore.getError()
	}
}
function getAllStates(){
	return{
		flash: LocationStore.getError()
		
	}
}
var TripAppLocation = React.createClass({

	cities: [
			"New York",
			"Chicago",
			"Los Angeles",
			"Boston",
			"Miami",
			"Atlanta",
			"Denver",
			
		],

	getInitialState: function(){
		return getAllStates();

	},

	componentDidMount: function() {
		var locationInput = this.refs.locationInput.getDOMNode();
		$(locationInput).autocomplete({
		 	source: this.cities
		 });
		
	},

	render: function(){
		
		if(!this.state.flash.error){
			return(
			<div className='location-container col-xs-12 col-md-6 col-md-offset-3 '>
				<div className='location'>
					<div className='location-panel panel panel-default'>
						<h2 className='pageTitle'> "What's your location?"</h2>
						<input id='location-input' ref='locationInput' placeholder={"Enter a US City..."} onBlur={this._save}/>
						<br />
						<button type="button" className="btn btn-next" onClick={this._buttonClick}>Next Page</button>
					</div>
				</div>	
			</div>
			);
		}
		else{
			return(
				<div>
				<p> looking</p>
				</div>
			);
		}
	},

	_buttonClick: function(){
		AppActions.findAirport();
		this.props.nextPage(this.props.currentPage);

	},

	_save: function(event){
		var newLocation = event.target.value;
		console.log('text' + newLocation);
		AppActions.updateLocation(newLocation);
	}

});

module.exports = TripAppLocation;