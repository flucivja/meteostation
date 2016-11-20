import React       from 'react';
import Chart       from './chart';

export default (props) => {
	return (
		  <Chart data={props.data} 
		     title='Wind Speed' unit='Km/s'
		     verticalAxisTitle='Wind speed (Km/s)' />
	);
};