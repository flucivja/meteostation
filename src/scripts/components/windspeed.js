'use strict';

var React       = require('react');
var Chart       = require('./chart');

module.exports = React.createClass({
  render: function() {
      return (
      	  <Chart data={this.props.data} 
			     title='Wind Speed' unit='Km/s'
			     verticalAxisTitle='Wind speed (Km/s)' />
      );
  }
});