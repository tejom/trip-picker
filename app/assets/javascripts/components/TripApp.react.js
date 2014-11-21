var React = require('react');
var ListStore = require('../stores/ListStore');
var PageStore = require('../stores/PageStore');
var TripAppList = require('../components/TripAppList.react')

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
		currentPage: PageStore.getPage()

	}
}

var TripApp = React.createClass({

	getInitialState: function(){
		return getAllStates();				
	},

	componentDidMount: function(){
		PageStore.addChangeListener(this._onChange);
		ListStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		PageStore.removeChangeListener(this._onChange);
		ListStore.removeChangeListener(this._onChange);
	},

	nextPage: function(){
		var currentPage = this.state.currentPage;
		AppActions.nextPage(currentPage);
	},



	render: function(){
		var attributeList = this.state.allList;
		var wantedAttributes = this.state.wantedAttributes;
		console.log(attributeList);
		return(
			<div>
				<h2>REact Works</h2>
			
				<TripAppList attributeList={attributeList} wantedAttributes={wantedAttributes}/>
				<h3>Current Page {this.state.currentPage}</h3>
				<button type="button" onClick={this.nextPage}>Next Page</button>
			</div>
			);
	},

	_onChange: function(){
		this.setState(getAllStates());
	}
});

module.exports= TripApp;