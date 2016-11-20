import React     from 'react';
import { Label } from 'react-bootstrap';

export default class CountDown extends React.Component {

    interval = null;

    constructor(props) {
      super(props);
      this.state = {
        count: props.count,
        date: this.getCurrentDate()
      };
    } 

    getCurrentDate() {
        var date = new Date();
        return this.get2Digit(date.getDate()) 
                + '.' + this.get2Digit(date.getMonth()+1)  
                + '.' + date.getFullYear()
                + ' ' + this.get2Digit(date.getHours())
                + ':' + this.get2Digit(date.getMinutes()) 
                + ':' + this.get2Digit(date.getSeconds()); 
    }

    get2Digit(number) {
        number += '';
        return number.length === 1 ? '0' + number : number;
    }

    updateCount = () => {
        var nextCount = this.state.count - 1000;
        var date = this.state.date;
        if(nextCount < 1) {
            nextCount = this.props.count;
            date = this.getCurrentDate();
            this.props.onZero();
        }
        this.setState({
            count: nextCount,
            date: date
        });
    }

    componentWillMount() {
        this.interval = window.setInterval(this.updateCount, 1000);
    }

    componentWillUnmount() {
        this.intervals.forEach(window.clearInterval);
        window.clearInterval(this.interval);
    }

    getCountdownString() {
        var allSeconds = this.state.count / 1000;
        var seconds = allSeconds % 60;
        var minutes = parseInt(allSeconds / 60, 10);

        return minutes + 'm ' + seconds + 's';
    }

    onManualRefresh = () => {
        this.setState({count: 0});
    }

    render() {
      return (
          <div>
            <span>Last refresh at: </span>
            <Label className="pull-right">{this.state.date}</Label><br />             
            <span>Time to next refresh: </span>
            <Label className="pull-right">
                <span>{this.getCountdownString()}</span>
                <span onClick={this.onManualRefresh} title="refresh manualy" className="glyphicon glyphicon-refresh manualRefresh" ></span>
            </Label>
          </div>
      );
    }
};