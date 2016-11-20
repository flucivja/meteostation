import React           from 'react';
import { ProgressBar } from 'react-bootstrap';
import CurrentWeather  from './components/currentWeather';
import Countdown       from './components/countdown';
import Chart           from './components/chart';

export default class App extends React.Component {

  intervals = [];
  dataPullInterval = 300000;

  allowedTypes = ['intemp', 'outtemp', 'inhum', 'outhum', 'baropress', 'windspeed', 'gustwindspeed',
          'winddir', 'dayrain', 'monthrain', 'yearrain', 'rainrate'];

  getDayDate(date) {
    return this.get2Digit(date.getMonth()+1) + '-' + this.get2Digit(date.getDate()) + '-' + date.getFullYear(); 
  }

  get2Digit(number) {
    number += '';
    return number.length === 1 ? '0' + number : number;
  }

  pullData = () => {
    Promise.all([
      fetch('http://meteo.devfl.com/server/index.php'), 
      fetch('http://meteo.devfl.com/server/health.php')
    ])
    .then((responses) => {
      return Promise.all(responses.map((res) => res.json()));
    }).then((responses) => {    
      var data   = responses[0];
      var health = responses[1];  
      var items = {};
      this.allowedTypes.forEach((type) => {
        items[type] = {};
      });

      data.data.forEach((item) => {
        Object.keys(item).forEach((type) => {
          var value = item[type];
          if(!items[type]) {
            return;
          }
          var dateTimeSegments = item.date.split(' ');
          var dateSegments = dateTimeSegments[0].split('-');
          var timeSegments = dateTimeSegments[1].split(':');
          var date = new Date(parseInt(dateSegments[0], 10),
                              parseInt(dateSegments[1], 10)-1,
                              parseInt(dateSegments[2], 10),
                              parseInt(timeSegments[0], 10),
                              parseInt(timeSegments[1], 10),
                              parseInt(timeSegments[2], 10));
          var dayDate = this.getDayDate(date);
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

      this.setState({
        data: items,
        isLoading: false,
        health: health.status
      });
    }, () => {
      this.setState({
        isLoading: false,
        error: true
      });
    });
  }

  componentWillMount() {
    this.pullData();
  }

  componentDidMount() {
    this.intervals.push(window.setInterval(this.pullData, this.dataPullInterval));
  }

  componentWillUnmount() {
      this.intervals.forEach(window.clearInterval);
  }

  state = {
    data: {
      header: [],
      data: []
    },
    isLoading: true
  };

  getLastWeather(data) {
    var items = {};
    Object.keys(data).forEach((type) => {
      var obj = data[type];
      var dateKeys = Object.keys(obj);
      var dateValue = obj[dateKeys[dateKeys.length-1]];
      var hourKeys = Object.keys(dateValue);
      var hourValue = dateValue[hourKeys[hourKeys.length -1]];
      var minuteKeys = Object.keys(hourValue);
      items[type] = hourValue[Object.keys(hourValue)[minuteKeys.length - 1]];
    });

    return items;
  }

  render() {
    if(this.state.isLoading) {
      return (
        <ProgressBar active now={100} />
      );
    } else {
      var data = this.state.data;
      if(data.outtemp) {
        return (
          <div className="container">
            <CurrentWeather items={this.getLastWeather(data)} health={this.state.health}>
              <Countdown count={this.dataPullInterval} onZero={this.pullData}/>
            </CurrentWeather>
            <Chart data={data.outtemp} 
                 title='Temperature out' unit='°C'
                 verticalAxisTitle='Temperature (°C)'
                 dataPullInterval={this.dataPullInterval} />
            <Chart data={data.intemp} 
                 title='Temperature in' unit='°C'
                 verticalAxisTitle='Temperature (°C)'
                 dataPullInterval={this.dataPullInterval} />
            <Chart data={data.gustwindspeed} 
                 title='Gust Speed' unit='Km/s'
                 verticalAxisTitle='Gust Speed (Km/s)'
                 dataPullInterval={this.dataPullInterval} />
            <Chart data={data.windspeed} 
                 title='Wind Speed' unit='Km/s'
                 verticalAxisTitle='Wind Speed (Km/s)'
                 dataPullInterval={this.dataPullInterval} />
            <Chart data={data.outhum} 
                 title='Humidity Out' unit='%'
                 verticalAxisTitle='Humidity Out %'
                 dataPullInterval={this.dataPullInterval} />
            <Chart data={data.inhum} 
                 title='Humidity In' unit='%'
                 verticalAxisTitle='Humidity In %'
                 dataPullInterval={this.dataPullInterval} />
          </div>
        );
      } else {
        return (<div>No data</div>);
      }     
    }
  }
};