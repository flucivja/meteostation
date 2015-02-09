'use strict';

var React = require('react');
var Label = require('react-bootstrap/Label');

module.exports = React.createClass({

    interval: null,

    getCurrentDate: function() {
        var date = new Date();
        return this.get2Digit(date.getDate()) 
                + '.' + this.get2Digit(date.getMonth()+1)  
                + '.' + date.getFullYear()
                + ' ' + this.get2Digit(date.getHours())
                + ':' + this.get2Digit(date.getMinutes()) 
                + ':' + this.get2Digit(date.getSeconds()); 
    },

    get2Digit: function(number) {
        number = number + '';
        return number.length === 1 ? '0' + number : number;
    },

    updateCount: function() {
        var nextCount = this.state.count - 1000;
        var date = this.state.date;
        if(nextCount < 1) {
            nextCount = this.props.count;
            date = this.getCurrentDate();
        }
        this.setState({
            count: nextCount,
            date: date
        });
    },

    componentWillMount: function() {
        this.setState({
            count: this.props.count,
            date: this.getCurrentDate()
        });
        this.interval = window.setInterval(this.updateCount, 1000);
    },

    componentWillUnmount: function() {
        this.intervals.forEach(window.clearInterval);
        window.clearInterval(this.interval);
    },

    getCountdownString: function() {
        var allSeconds = this.state.count / 1000;
        var seconds = allSeconds % 60;
        var minutes = parseInt(allSeconds / 60);

        return minutes + 'm ' + seconds + 's';
    },

    render: function() {
      return (
          <div>
            Last refresh at: <Label className="pull-right">{this.state.date}</Label><br />             
            Time to next refresh: <Label className="pull-right">{this.getCountdownString()}</Label>
          </div>
      );
    }
});