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
	}
}

module.exports = AppActions;