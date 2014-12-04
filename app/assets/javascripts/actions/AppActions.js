var AppDispatcher = require('../dispatcher/TripAppDispatcher');
var TripAppConstants = require('../constants/TripAppConstants');

var AppActions = {
	nextPage: function(page){
		AppDispatcher.handleAction({
			actionType: TripAppConstants.PAGE_INCREMENT,
			data: page
		})
	},
	setInitialAttributes: function(data){
		AppDispatcher.handleAction({
			actionType: TripAppConstants.SET_ATTRIBUTES,
			data: data
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

	findAirport: function(data){
		AppDispatcher.handleAction({
			actionType: TripAppConstants.FIND_AIRPORT,
			data: data
		})
	
	},
	resetApp: function(){
		AppDispatcher.handleAction({
			actionType: TripAppConstants.RESET_APP,
			data: ''
		})
	},
	setError: function(data){
		AppDispatcher.handleAction({
			actionType: TripAppConstants.SET_ERROR,
			data: data
		})
	}

}

module.exports = AppActions;