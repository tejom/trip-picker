var React = require('react');

var FlashMessage = React.createClass({

	render: function(){
		if(this.props.show){
			return(
			<div className='flash-message alert alert-danger'>
				<p>{this.props.message}</p>
			</div>
			);
		}
		return(
			<div></div>
			);
	}
});

module.exports = FlashMessage;

