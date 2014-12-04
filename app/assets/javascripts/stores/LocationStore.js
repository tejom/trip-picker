var AppDispatcher = require('../dispatcher/TripAppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TripAppConstants = require('../constants/TripAppConstants');
var merge = require('react/lib/merge');

var AirSearch = require('../util/AirSearch');

var CHANGE_EVENT='updateLocation';
var PAGE_EVENT='changePage';

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



function findAirport(data){
	if(data){
		
		console.log("coordinates passed");
		console.log(data);
		AirSearch.findGeoAirport(data.latitude,data.longitude,setAirportCode);
	}
	else{
	AirSearch.findAirport(_location.citySearch,setAirportCode);
	console.log("no coordinates");
	}
}


function setAirportCode(city,data){
	
	_location.airportCode = data;
	if(!city){
		updateLocation(data[0].city)
	}
	console.log("setting to");
	console.log(data[0].city);
		
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
	emitChange: function(event) {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback){
		this.on(CHANGE_EVENT,callback);
	},
	addPageListener: function(callback){
		this.on(PAGE_EVENT,callback);
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
			findAirport(action.data);
			break;

		case TripAppConstants.RESET_APP:
			resetLocation();
			clearError();
			break;
		case TripAppConstants.SET_ERROR:
			console.log('setting error');
			console.log(action.data);
			setError(action.data);
			LocationStore.emitChange(CHANGE_EVENT);
		default:
			return true;
		}
		LocationStore.emitChange();

  		return true;

	
});

module.exports = LocationStore;