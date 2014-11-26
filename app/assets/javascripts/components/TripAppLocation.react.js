var React = require('react');
var AppActions = require('../actions/AppActions');
var LocationStore = require('../stores/LocationStore');


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

function getAllStates(){
	getCityList().done(function(data){
		console.log(data);
	})
	return getCityList()
}
var TripAppLocation = React.createClass({

	cities: [
			
		],

	getInitialState: function(){
		
		return {city: [] }
		
	},

	componentDidMount: function() {
		getCityList(this,setAutoCompleteList);
		
		console.log(this.state.city)
		
	},



	render: function(){
		
		
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