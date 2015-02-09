'use strict';

var React          = require('react');
var Router         = require('react-router');
var RouteHandler   = Router.RouteHandler;
var Link           = Router.Link;
var ProgressBar    = require('react-bootstrap/ProgressBar');
var CurrentWeather = require('./CurrentWeather');
var Countdown      = require('./countdown');
var Chart          = require('./chart');

module.exports = React.createClass({

	mixins: [ Router.State ],

	intervals: [],
	dataPullInterval: 300000,

	allowedTypes: ['intemp', 'outtemp', 'inhum', 'outhum', 'baropress', 'windspeed', 'gustwindspeed',
					'winddir', 'dayrain', 'monthrain', 'yearrain', 'rainrate'],

	getDayDate: function(date) {
		return this.get2Digit(date.getMonth()+1) + '-' + this.get2Digit(date.getDate()) + '-' + date.getFullYear(); 
	},

	get2Digit: function(number) {
		number = number + '';
		return number.length === 1 ? '0' + number : number;
	},

	pullData: function() {
		var self = this;
		$.ajax('http://www.devfl.com/meteo/server/index.php').done(function(data) {
			var items = {};
			$.each(self.allowedTypes, function(i, type) {	
				items[type] = {};
			});
			$.each(data.data, function(i, item) {
				$.each(item, function(type, value) {
					if(!items[type]) {
						return true;
					}
					var date = new Date(item.date);
					var dayDate = self.getDayDate(date);
					if(!items[type][dayDate]) {
						items[type][dayDate] = {};
					}
					var currentHour = date.getHours();
					var currentMinute = date.getMinutes();
					if(!items[type][dayDate][currentHour]) {
						items[type][dayDate][currentHour] = {};
					}
					items[type][dayDate][currentHour][currentMinute] = value;
				});
			});

			self.setState({
				data: items,
				isLoading: false
			});
		}).fail(function() {
			self.setState({
				isLoading: false,
				error: true
			});
		});
	},

	componentWillMount: function() {
		this.pullData();
	},

	componentDidMount: function() {
		this.intervals.push(window.setInterval(this.pullData, this.dataPullInterval));
	},

    componentWillUnmount: function() {
        this.intervals.forEach(window.clearInterval);
    },

	getInitialState: function() {
		return {
			data: {
				header: [],
				data: []
			},
			isLoading: true
		}
	},

	getLastWeather: function(data) {
		var items = {};
		$.each(data, function(type, obj) {
			var dateKeys = Object.keys(obj);
			var dateValue = obj[dateKeys[dateKeys.length-1]];
			var hourKeys = Object.keys(dateValue);
			var hourValue = dateValue[hourKeys[hourKeys.length -1]];
			var minuteKeys = Object.keys(hourValue);
			items[type] = hourValue[Object.keys(hourValue)[minuteKeys.length - 1]];
		});

		return items;
	},

	render: function() {
		if(this.state.isLoading) {
			return (
				<ProgressBar active now={100} />
			);
		} else {
			var data = this.state.data;
			if(data.outtemp) {
				return (
					<div className="container">
						<CurrentWeather items={this.getLastWeather(data)}>
							<Countdown count={this.dataPullInterval}/>
						</CurrentWeather>
						<Chart data={data.outtemp} 
						     title='Temperature out' unit='°C'
						     verticalAxisTitle='Temperature (°C)'
						     dataPullInterval={this.dataPullInterval} />
						<Chart data={data.intemp} 
						     title='Temperature in' unit='°C'
						     verticalAxisTitle='Temperature (°C)'
						     dataPullInterval={this.dataPullInterval} />
						<Chart data={data.windspeed} 
						     title='Wind Speed' unit='Km/s'
						     verticalAxisTitle='Wind Speed (Km/s)'
						     dataPullInterval={this.dataPullInterval} />
					</div>
				);
			} else {
				<div>No data</div>
			}			
		}
	}
});