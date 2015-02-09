'use strict';

var React       = require('react');
var Chart       = require('./chart');

module.exports = React.createClass({
  render: function() {
      return (
      	  <Chart data={this.props.data} 
			     title='In temperature' unit='°C'
			     verticalAxisTitle='Temperature (°C)' />
      );
  }
});