var AppDispatcher = require('../dispatcher/TripAppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TripAppConstants = require('../constants/TripAppConstants');
var merge = require('react/lib/merge');

var CHANGE_EVENT = 'change';

var _pageNumber = 1;

function incrementPage(){
	_pageNumber++;
	console.log('page incremented' + _pageNumber);
}

var PageStore = merge(EventEmitter.prototype,{
	getPage: function(){
		return _pageNumber;
	},

	//wrappers for node emmit, add/remove listeners functions
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback){
		this.on(CHANGE_EVENT,callback);
		console.log('listener added');
	},
	removeChangeListener: function(callback){
		this.removeListener(CHANGE_EVENT,callback);
	}
});

//Register callbacks with dispatcher

AppDispatcher.register(function(payload){
	var action= payload.action;
	console.log(action.data);
	switch(action.actionType){
		case TripAppConstants.PAGE_INCREMENT:
			console.log('increment');
			incrementPage();
			break;

		default:
			return true;
		}
		PageStore.emitChange();

  		return true;

	
});

module.exports = PageStore;