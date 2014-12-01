var AppDispatcher = require('../dispatcher/TripAppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TripAppConstants = require('../constants/TripAppConstants');
var merge = require('react/lib/merge');

var AirSearch = require('../util/AirSearch');

var CHANGE_EVENT='updateLocation';

var _location = {
		citySearch: '',
		airportCode: [],				//array of close airports
}

var _error = {
	error: false,
	message: ''
}


function updateLocation(text){
	_location.citySearch = text;
}

function setError(message) {
	_error.error= true,
	_error.message = message

}

function clearError(){
	_error.error =  false,
	_error.message= ''

}



function findAirport(){
	
	AirSearch.findAirport(_location.citySearch,setAirportCode);

}


function setAirportCode(city,data){

	_location.airportCode = data;
		
}

function resetLocation(){
	_location = {
		citySearch: '',
		airportCode: []				//array of close airports
	}
}


var LocationStore = merge(EventEmitter.prototype,{
	getLocation: function(){
		return _location;
	},

	getError: function(){
		return _error;
	},

	//wrappers for node emmit, add/remove listeners functions
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback){
		this.on(CHANGE_EVENT,callback);
	},
	removeChangeListener: function(callback){
		this.removeListener(CHANGE_EVENT,callback);
	}
});

AppDispatcher.register(function(payload){
	var action= payload.action;
	switch(action.actionType){
		case TripAppConstants.UPDATE_LOCATION:
			updateLocation(action.data);
			break;

		case TripAppConstants.FIND_AIRPORT:
			findAirport();
			break;

		case TripAppConstants.RESET_APP:
			resetLocation();
			break;
		default:
			return true;
		}
		LocationStore.emitChange();

  		return true;

	
});

module.exports = LocationStore;