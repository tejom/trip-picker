var React = require('react');
var ListStore = require('../stores/ListStore');

var ListItem = React.createClass({

	click: function(){
		var data = {
			'index' : this.props.index,
			'id' : this.props.id
		}
		this.props.onClick(data);
	},

	render: function(){
		return(
		<li className=' list-item list-group-item' key={this.props.key} onClick={this.click} >{this.props.value}</li>

		);
		}

});

module.exports = ListItem;