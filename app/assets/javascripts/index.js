var React = require('react');

var TripApp = require('./components/TripApp.react');

$(document).ready(function () {

React.render(
		<TripApp />,
        document.getElementById('app')
      );




});