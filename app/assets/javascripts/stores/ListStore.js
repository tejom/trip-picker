var AppDispatcher = require('../dispatcher/TripAppDispatcher');
var EventEmitter = require('events').EventEmitter;
//var AppConstants = require('../constants/AppConstants');
var merge = require('react/lib/merge');

var CHANGE_EVENT = 'change';

var ListStore = merge(EventEmitter.prototype,{
	getAll: function(){
		return 'Store String';
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

module.exports = ListStore;