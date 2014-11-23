var AppDispatcher = require('../dispatcher/TripAppDispatcher');
var TripAppConstants = require('../constants/TripAppConstants');

var AppActions = {
	nextPage: function(page){
		AppDispatcher.handleAction({
			actionType: TripAppConstants.PAGE_INCREMENT,
			data: page
		})
	},

	addAttribute: function(data){
		AppDispatcher.handleAction({
			actionType: TripAppConstants.ADD_ATTRIBUTE,
			data: data
		})
	},
	removeAttribute: function(data){
		AppDispatcher.handleAction({
			actionType: TripAppConstants.REMOVE_ATTRIBUTE,
			data: data
		})
	},
	updateLocation: function(data){
		AppDispatcher.handleAction({
			actionType: TripAppConstants.UPDATE_LOCATION,
			data:data
		})
	},

	findAirport: function(){
		AppDispatcher.handleAction({
			actionType: TripAppConstants.FIND_AIRPORT,
			data: ''
		});
	
	}

}

module.exports = AppActions;