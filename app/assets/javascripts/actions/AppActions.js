var AppDispatcher = require('../dispatcher/TripAppDispatcher');
var TripAppConstants = require('../constants/TripAppConstants');

var AppActions = {
	nextPage: function(page){
		console.log('app action run');
		AppDispatcher.handleAction({
			actionType: TripAppConstants.PAGE_INCREMENT,
			data: page
		})
	},

	addAttribute: function(data){
		console.log('addAttribute action');
		AppDispatcher.handleAction({
			actionType: TripAppConstants.ADD_ATTRIBUTE,
			data: data
		})
	},
	removeAttribute: function(data){
		console.log('remove attribute action');
		AppDispatcher.handleAction({
			actionType: TripAppConstants.REMOVE_ATTRIBUTE,
			data: data
		})
	},
	updateLocation: function(data){
		console.log('update location action');
		AppDispatcher.handleAction({
			actionType: TripAppConstants.UPDATE_LOCATION,
			data:data
		})
	},

	findAirport: function(){
		console.log('find apirpot action');
		AppDispatcher.handleAction({
			actionType: TripAppConstants.FIND_AIRPORT,
			data: ''
		});
	
	}

}

module.exports = AppActions;