var React = require('react');
var ListStore = require('../stores/ListStore');
var LocationStore = require('../stores/LocationStore');
var ListItem = require('../components/ListItem.react');


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
	componentDidMount: function() {
		//AppActions.findAirport();

	},
	addAttribute: function(data){
			console.log(data);
			AppActions.addAttribute(data);
	},

	removeAttribute: function(data){
		console.log(data);
		AppActions.removeAttribute(data);
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
		console.log(list);
		list.forEach( function(attribute) {
			if(attribute.value.indexOf(filter) !== -1){
			filteredList.push(attribute);
			}
			
		});

		var attributeList = generateList(filteredList,this.addAttribute);
		
		var wantedList = this.props.wantedAttributes;
		var wantedAttributeList = generateList(wantedList,this.removeAttribute);
	

		return(
			<div className='list'>
				<div className='panel list-panel'>
					<h2>What Qualities are Important to You?</h2>
					<input value={this.state.filter} ref="searchInput" placeholder='Search...' onChange={this.handleSearchInput}/>
					<div className='row'>	
						<div className='col-xs-6 att-floats'>
							<h2>Available</h2>
							<div className='att-list-container'>
							<ul className='attribute-list list-group'>
							 {attributeList} 
							</ul>
							</div>
						</div>
						
						<div className='col-xs-6 att-floats'>
							<h2>Selected</h2>
							<div className='att-list-container'>
							<ul className='attribute-list list-group'>
							 {wantedAttributeList}
							</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			);

	},

	
});

module.exports = TripAppList;