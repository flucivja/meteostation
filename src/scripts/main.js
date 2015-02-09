'use strict';

var React        = require('react'),
    Router       = require('react-router'),
    Route        = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    App          = require('./components/app'),
    InTemp       = require('./components/intemp'),
    OutTemp      = require('./components/outtemp'),
    WindSpeed    = require('./components/windspeed');

var routes = (
    <Route handler={App} name="home" path="/">
    	<DefaultRoute name="outtempcurrent" handler={OutTemp}/>
    	<Route name="outtemp" path="outtemp/:date" handler={OutTemp}/>
    	<Route name="intemp" path="intemp/:date" handler={InTemp}/>
    	<Route name="windspeed" path="windspeed/:date" handler={WindSpeed}/>
    </Route>
);

Router.run(routes, Router.HashLocation, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});