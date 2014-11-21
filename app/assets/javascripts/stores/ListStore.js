var AppDispatcher = require('../dispatcher/TripAppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TripAppConstants = require('../constants/TripAppConstants');
var merge = require('react/lib/merge');

var CHANGE_EVENT = 'listChange';

var _attributes = [
	{'id':0,'value':'hot'},
	{'id':1,'value':'cold'},
	{'id':2,'value':'sunny'},
	{'id':3,'value':'cheap'},
	{'id':4,'value':'exclusive'},
	{'id':5,'value':'mountains'},
	{'id':6,'value':'large city'}
]

var _wantedAttributes = [];

function addAttribute(data){
	var id = data.id;
	var index = data.index;

	var tempAttribute = $.grep(_attributes, function(i){			//finds the object that matches the given id
		return i.id === id;
	});
	arrayIndex = _attributes.indexOf(tempAttribute[0]);				//gets the index of thefound object in the array
	
	_attributes.splice(arrayIndex,1);
	_wantedAttributes.push({'id': tempAttribute[0].id, 'value':tempAttribute[0].value});
	
}

var ListStore = merge(EventEmitter.prototype,{
	getAtrributes: function(){
		return _attributes;
	},

	getWantedAttributes: function(){
		return _wantedAttributes;
	},

	//wrappers for node emmit, add/remove listeners functions
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback){
		this.on(CHANGE_EVENT,callback);
		console.log('list store listeners');
	},
	removeChangeListener: function(callback){
		this.removeListener(CHANGE_EVENT,callback);
	}
});

AppDispatcher.register(function(payload){
	var action= payload.action;
	console.log(action.data);
	switch(action.actionType){
		case TripAppConstants.ADD_ATTRIBUTE:
			console.log('iregistered add attribute');
			addAttribute(action.data);
			break;

		default:
			return true;
		}
		ListStore.emitChange();

  		return true;

	
});

module.exports = ListStore;