import React       from 'react';
import Chart       from './chart';

export default (props) => {
	return (
		  <Chart data={props.data} 
		     title='Out temperature' unit='°C'
		     verticalAxisTitle='Temperature (°C)' />
	);
};