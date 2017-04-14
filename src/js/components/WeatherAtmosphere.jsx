import React from 'react';
import {sprintf} from 'sprintf-js';
import {displayUnit} from 'utils/units';


export default class WeatherAtmosphere extends React.Component {

	render() {
		const {weather, units} = this.props;

		const clouds = sprintf(
			'%d/10; %s - %s',
			weather.clouds.density,
			displayUnit.altitude(weather.clouds.base, '', units.altitude),
			displayUnit.altitude(weather.clouds.base + weather.clouds.thickness, '', units.altitude)
		);

		return (
			<div className="weather atmosphere">
				<label>Visibility:</label> -<br />
				<label>Clouds:</label> {clouds}<br />
				<label>Qnh:</label> {weather.qnh}
			</div>
		);
	}
}
