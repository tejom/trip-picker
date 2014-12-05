var React = require('react');
var AppActions = require('../actions/AppActions');
var LocationStore = require('../stores/LocationStore');
var FlashMessage = require('../components/FlashMessage.react');


function getCityList(obj,callback){
	var cityList = []
	return $.ajax({
		url:'api/v1/citys',
		success: function(data){
			console.log(data);
			for(var key in data){
				cityList.push(data[key].name);
			}
			obj.setState({city:cityList});

			callback(obj);
	
		}
	});

}

function setAutoCompleteList(obj){
	var locationInput = obj.refs.locationInput.getDOMNode();
			$(locationInput).autocomplete({
			 	source: obj.state.city
			 });

}

function getError(){
	return LocationStore.getError();
}

function getAllStates(){
	getCityList().done(function(data){
		console.log(data);
	})
	return {
		city: getCityList(),
		error: getError()
	}
}

function validateInput(input){
	if(input){
		return true;
	}
	return false;
}
var TripAppLocation = React.createClass({

	cities: [
			
		],
	changePage: function(){
		
	},
	getInitialState: function(){
		
		return {
			city: [] ,
			error:getError()
		}
		
	},

	componentDidMount: function() {
		getCityList(this,setAutoCompleteList);
		LocationStore.addChangeListener(getError);
		console.log(this.state.city)
		
	},



	render: function(){
		console.log(this.state.error.error)
		
		return(

			<div >
				<div className='location'>
					<div className='location-panel panel panel-default'>
						<h2 className="page-title"> What's your location? </h2>
						<input id='location-input' ref='locationInput' placeholder={"Enter a US City..."} onBlur={this._save}/>
						<br />
						<button type="button" className="btn btn-gps" onClick={this._getCoord}>Find My Location </button>

						<button type="button" className="btn btn-next" onClick={this._buttonClick}>Next Page</button>
						<FlashMessage show={this.state.error.error} message={this.state.error.message} />
					</div>
				</div>	
			</div>
			);
		
	},

	_getCoord: function(){
		var findLocation = navigator.geolocation.getCurrentPosition( 
		function(pos){
			console.log(pos.coords);

			AppActions.findAirport(pos.coords);
			this.props.nextPage(this.props.currentPage);
			
			
		}.bind(this),
		function(err){
			
			switch(err.code){
				case 1:
					AppActions.setError("You need to allow access to your location to continue");
					console.log(this.props.currentPage);
					break;
				default:
					AppActions.setError(err.message);
					break;
			}			
		}.bind(this) );



	},

	_buttonClick: function(){
		var input = this.props.location.citySearch;
		
		if(validateInput(input)){
			AppActions.findAirport();
			this.props.nextPage(this.props.currentPage);
		}
		else{
			AppActions.setError("There was a problem with the location you gave");
			this.setState({error: getError()});
		}

	},

	_save: function(event){
		var newLocation = event.target.value;
		console.log('text' + newLocation);
		AppActions.updateLocation(newLocation);
	}

});

module.exports = TripAppLocation;