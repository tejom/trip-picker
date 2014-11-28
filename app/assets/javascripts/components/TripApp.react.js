var React = require('react');
var ListStore = require('../stores/ListStore');
var PageStore = require('../stores/PageStore');
var LocationStore = require('../stores/LocationStore');

var TripAppList = require('../components/TripAppList.react')
var TripAppLocation = require('../components/TripAppLocation.react');
var TripAppResults = require('../components/TripAppResults.react');

var AppActions = require('../actions/AppActions');

function getListState(){
	return{
		List: ListStore.getAtrributes()
	}
}

function getPageState(){
	return{
		currentPage: PageStore.getPage()
	}
}

function getAllStates(){
	return{
		attributes: ListStore.getAtrributes(),
		wantedAttributes: ListStore.getWantedAttributes(),
		currentPage: PageStore.getPage(),
		location: LocationStore.getLocation()

	}
}



var TripApp = React.createClass({

	getInitialAttributes: function(){
		$.ajax({
			url:'api/v1/traits',
			success: function(data){
				var array =[];
				for( var key in data){
					array.push( {id: data[key].id ,value: data[key].name });
				}
				this.setState({attributes: array});

				return array;
			}.bind(this)

		});

	},

	getInitialState: function(){
		
		return getAllStates();				
	},

	componentDidMount: function(){
		this.getInitialAttributes();

		PageStore.addChangeListener(this._onChange);
		ListStore.addChangeListener(this._onChange);
		LocationStore.addChangeListener(this._onChange);

	},

	componentWillUnmount: function() {
		PageStore.removeChangeListener(this._onChange);
		ListStore.removeChangeListener(this._onChange);
		LocationStore.removeChangeListener(this._onChange);
	},

	nextPage: function(){
		var currentPage = this.state.currentPage;
		AppActions.nextPage(currentPage);
	},



	render: function(){
		var attributeList = this.state.attributes;
		var wantedAttributes = this.state.wantedAttributes;
		var location = this.state.location;

		console.log(attributeList);
		
		switch(this.state.currentPage){
			case 1:
				return(
					<div className='row'>
					<div className='home-container col-xs-12 col-md-6 col-md-offset-3 '>
						<h1 className='page-title'>Find a Trip</h1>
							<div className='home'>
								<div className='home-panel panel panel-default'>
								<h2> Welcome</h2>
								<button type="button" className="btn btn-next" onClick={this.nextPage}>Get Started!</button>
								</div>
							</div>
						</div>
					</div>
					);

			case 2:
				return(
					<div className='row'>
					
					<TripAppLocation nextPage={this.nextPage} currentPage={2} />
					
					</div>
					);

			case 3:
				return(
					<div className='row'>
						<div className='list-container col-xs-12 col-md-6 col-md-offset-3 '>
							<TripAppList attributeList={attributeList} wantedAttributes={wantedAttributes}/>
							<button type="button" onClick={this.nextPage}>Next Page</button>
						</div>
					</div>
					);

			case 4:
			return(
				<div>
					<TripAppResults 
						wantedAttributes={wantedAttributes} 
						location={location}/>
					
				</div>
				);
		}
	},

	_onChange: function(){
		this.setState(getAllStates());
	}
});

module.exports= TripApp;