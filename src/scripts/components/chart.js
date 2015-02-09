'use strict';

var React = require('react');

module.exports = React.createClass({

	getStartinterval: function(data) {
		var firstItemKey = Object.keys(data)[0];
		var firstItem = data[firstItemKey];
		var dateStringArr = firstItemKey.split('-');
		var date = new Date();
		date.setDate(parseInt(dateStringArr[1]));
		date.setMonth(parseInt(dateStringArr[0] -1));
		date.setFullYear(parseInt(dateStringArr[2]));
		var hour = Object.keys(firstItem)[0];
		var minute = Object.keys(firstItem[hour])[0];
		
		return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(hour), parseInt(minute));
	},

	getData: function(props) {
		var items = [];
		$.each(props.data, function(date, dateItem) {
			$.each(dateItem, function(hour, hourItem) {
				$.each(hourItem, function(minute, minuteItem) {
					console.log(date, hour, minute);
					items.push(parseFloat(minuteItem));
				});
			});
		});

		return items;
	},

	getChart: function(props) {
		return {
			chart: {
				type: 'spline',
				title: {
		            text: props.title,
		            x: -20
		        },
		        xAxis: {
		            type: 'datetime',
		            labels: {
		                overflow: 'justify'
		            }
		        },
		        yAxis: {
		            title: {
		                text: props.verticalAxisTitle
		            },
		            plotLines: [{
		                value: 0,
		                width: 1,
		                color: '#808080'
		            }]
		        },
		        tooltip: {
		            valueSuffix: props.unit
		        },
		        legend: {
		            layout: 'vertical',
		            align: 'right',
		            verticalAlign: 'middle',
		            borderWidth: 0
		        },
		        series: [{
		            name: props.title,
		            data: this.getData(props),
		            pointInterval: this.props.dataPullInterval,
		            pointStart: this.getStartinterval(props.data),
		            lineWidth: 4,
	                states: {
	                    hover: {
	                        lineWidth: 5
	                    }
	                },
	                marker: {
	                    enabled: false
	                }
		        }]	        
	    	}
		};
	},

	getInitialState: function() {
		return this.getChart(this.props);
	},

	componentDidMount: function() {
		$(this.getDOMNode()).highcharts(this.state.chart);
	},

	componentWillReceiveProps: function(props) {
	    this.setState(this.getChart(props));
	},

	componentWillUpdate: function() {
		$(this.getDOMNode()).highcharts(this.state.chart);
	},

	render: function() {	
		return (
			<div></div>
		);
	}
});