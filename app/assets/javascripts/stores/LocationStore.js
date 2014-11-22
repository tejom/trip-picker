var AppDispatcher = require('../dispatcher/TripAppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TripAppConstants = require('../constants/TripAppConstants');
var merge = require('react/lib/merge');

var AirSearch = require('../util/AirSearch');

var CHANGE_EVENT='updateLocation';

var _location = {
		citySearch: '',
		airportCode: []				//array of close airports
};

function updateLocation(text){
	_location.citySearch = text;
	console.log('location updated' + text);
}

function findAirport(){

	AirSearch.findAirport(_location.citySearch,setAirportCode);

}

function setAirportCode(data){
	_location.airportCode = data;
}



var LocationStore = merge(EventEmitter.prototype,{
	getLocation: function(){
		return _location;
	},
	//wrappers for node emmit, add/remove listeners functions
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback){
		this.on(CHANGE_EVENT,callback);
		console.log('location store listeners');
	},
	removeChangeListener: function(callback){
		this.removeListener(CHANGE_EVENT,callback);
	}
});

AppDispatcher.register(function(payload){
	var action= payload.action;
	console.log(action.data);
	switch(action.actionType){
		case TripAppConstants.UPDATE_LOCATION:
			console.log('registered change location');
			updateLocation(action.data);
			findAirport();
			break;

		case TripAppConstants.FIND_AIRPORT:
			console.log('regiter findAirport action');
			findAirport();
			break;

		default:
			return true;
		}
		LocationStore.emitChange();

  		return true;

	
});

module.exports = LocationStore;