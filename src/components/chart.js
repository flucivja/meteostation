import React from 'react';
import ReactDOM from 'react-dom';
import Highcharts from 'highcharts/highstock';

export default class Chart extends React.Component {

	constructor(props) {
	  super(props);
	  this.state = this.getChart(props);
	} 

	getData(props) {
		var items = [];
		Object.keys(props.data).forEach((date) => {
			var dateItem = props.data[date];
			Object.keys(dateItem).forEach((hour) => {
				var hourItem = dateItem[hour];
				Object.keys(hourItem).forEach((minute) => {
					var minuteItem = hourItem[minute];
					var dateSegments = date.split('-');
					var newDate = new Date();
					newDate.setUTCFullYear(dateSegments[2]);
					newDate.setUTCMonth(parseInt(dateSegments[0], 10)-1);
					newDate.setUTCDate(parseInt(dateSegments[1], 10));
					newDate.setUTCHours(hour);
					newDate.setUTCMinutes(minute);
					items.push([newDate.getTime(), parseFloat(minuteItem, 10)]);
				});
			});
		});

		return items;
	}

	getChart(props) {
		return {
			chart: {
				title: {
		      		text: props.title,
		       		x: -20
		   	    },
				rangeSelector : {
	                selected : 1,
					buttons: [{
						type: 'hour',
						count: 1,
						text: '1h'
					}, {
						type: 'hour',
						count: 6,
						text: '6h'
					}, {
						type: 'hour',
						count: 12,
						text: '12h'
					}, {
						type: 'day',
						count: 1,
						text: '1d'
					}, {
						type: 'day',
						count: 3,
						text: '3d'
					}, {
						type: 'week',
						count: 1,
						text: '1w'
					}, {
						type: 'week',
						count: 2,
						text: '2w'
					}, {
						type: 'month',
						count: 1,
						text: '1m'
					}, {
						type: 'year',
						count: 1,
						text: '1y'
					}, {
						type: 'all',
						text: 'All'
					}]
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
		            }],
					opposite: false
			    },
				series : [{
	                name : props.title,
	                data : this.getData(props),
	                lineWidth : 1,
	                marker : {
	                    enabled : true,
	                    radius : 2
	                },
	                tooltip: {
	                    valueDecimals: 2,
						valueSuffix: props.unit
	                }
	        	}]
	    	}
		};
	}

	componentDidMount() {
		var chart = Highcharts.stockChart(ReactDOM.findDOMNode(this), this.state.chart);
		this.setState({
			chartObj: chart
		})
	}

	componentWillReceiveProps(props) {
	    this.setState(this.getChart(props));
	}

	componentWillUpdate(props) {
		var chartObject = this.state.chartObj;
		if (chartObject) {
			var newData = this.getData(props);
			chartObject.series[0].setData(newData);
			chartObject.redraw();
		}		
	}

	render() {	
		return (
			<div></div>
		);
	}
};