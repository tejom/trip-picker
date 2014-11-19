var React = require('react');
var ListStore = require('../stores/ListStore');
var PageStore = require('../stores/PageStore');
var AppActions = require('../actions/AppActions');

function getListState(){
	return{
		allList: ListStore.getAll()
	}
}

function getPageState(){
	return{
		currentPage: PageStore.getPage()
	}
}

function getAllStates(){
	return{
		allList: getListState(),
		currentPage: getPageState()

	}
}

var TripApp = React.createClass({

	getInitialState: function(){
		return getAllStates();				
	},

	componentDidMount: function(){
		PageStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		PageStore.removeChangeListener(this._onChange);
	},

	nextPage: function(){
		var currentPage = this.state.currentPage;
		AppActions.nextPage(currentPage);
	},



	render: function(){
		return(
			<div>
				<h2>REact Works</h2>
				<h3>{this.state.allList}</h3>
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