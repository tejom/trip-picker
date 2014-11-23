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
		allList: ListStore.getAtrributes(),
		wantedAttributes: ListStore.getWantedAttributes(),
		currentPage: PageStore.getPage(),
		location: LocationStore.getLocation()

	}
}

var TripApp = React.createClass({

	getInitialState: function(){
		return getAllStates();				
	},

	componentDidMount: function(){
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
		var attributeList = this.state.allList;
		var wantedAttributes = this.state.wantedAttributes;
		var location = this.state.location;
		
		switch(this.state.currentPage){
			case 1:
				return(
					<div>
					<h1> Welcome</h1>
					<button type="button" onClick={this.nextPage}>Next Page</button>
					</div>
					);

			case 2:
				return(
					<div>
					<h1> Welcome</h1>
					<TripAppLocation />
					<button type="button" onClick={this.nextPage}>Next Page</button>
					</div>
					);

			case 3:
				return(
					<div>
					<h1> Welcome</h1>
					<TripAppList attributeList={attributeList} wantedAttributes={wantedAttributes}/>
					<button type="button" onClick={this.nextPage}>Next Page</button>
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