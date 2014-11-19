var AppDispatcher = require('../dispatcher/TripAppDispatcher');
var TripAppConstants = require('../constants/TripAppConstants');

var AppActions = {
	nextPage: function(page){
		console.log('app action run');
		AppDispatcher.handleAction({
			actionType: TripAppConstants.PAGE_INCREMENT,
			data: page
		})
	}
}

module.exports = AppActions;