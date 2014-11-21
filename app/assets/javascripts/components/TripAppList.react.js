var React = require('react');
var ListStore = require('../stores/ListStore');
var ListItem = require('../components/ListItem.react');
var ListSearch = require('../components/ListSearch.react');

var AppActions = require('../actions/AppActions');

function generateList(listArray,callback){
	var completeArray=[];

	for(var key in listArray){
		completeArray.push(
			<ListItem key={key}
					index={key}
					id={listArray[key].id}
					onClick={callback}
					value={listArray[key].value} />);
	}

	return completeArray;
}


var TripAppList = React.createClass({

	getInitialState: function(){
		
		return {
			filter: ''
		}
	},
	addAttribute: function(data){
			console.log(data);
			AppActions.addAttribute(data);
	},

	removeAttribute: function(key){
		//implent
	},

	handleSearchInput: function(text){
		var value=this.refs.searchInput.getDOMNode().value
		console.log(value);
		this.setState({
			filter: value
		});
	},




	render: function(){

		var list = this.props.attributeList;
		var filter = this.state.filter;
		var filteredList = [];
		list.forEach( function(attribute) {
			if(attribute.value.indexOf(filter) !== -1){
			filteredList.push(attribute);
			}
			
		});

		var attributeList = generateList(filteredList,this.addAttribute);
		
		var wantedList = this.props.wantedAttributes;
		var wantedAttributeList = generateList(wantedList,this.removeAttribute);
	

		return(
			<div>
			<h2>App List</h2>
			<input value={this.state.filter} ref="searchInput" onChange={this.handleSearchInput}/>
			
			<h2>Available</h2>
			<ul>
			 {attributeList} 
			</ul>
			
			<h2>Selected</h2>
			<ul>
			 {wantedAttributeList}
			</ul>

			</div>
			);



	},

	
});

module.exports = TripAppList;