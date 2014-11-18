var React = require('react');
var Store = require('../stores/ListStore');

function getListState(){
	return{
		allList: Store.getAll()
	}
}

var TripApp = React.createClass({

	getInitialState: function(){
		return getListState();				
	},

	render: function(){
		return(
			<div>
				<h2>REact Works</h2>
				<h3>{this.state.allList}</h3>
			</div>
			);
	}
});

module.exports= TripApp;