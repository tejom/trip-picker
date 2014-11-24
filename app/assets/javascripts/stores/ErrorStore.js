var AppDispatcher = require('../dispatcher/TripAppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TripAppConstants = require('../constants/TripAppConstants');
var merge = require('react/lib/merge');

var CHANGE_EVENT='updateError';

