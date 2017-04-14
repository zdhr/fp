import React from 'react';
import {sprintf} from 'sprintf-js';
import {displayUnit} from 'utils/units';


export default class WeatherWind extends React.Component {

	render() {
		const {wind, units} = this.props;

		const formatWind = (wind) => sprintf(
			'%d@%s',
			wind.dir,
			displayUnit.speed(wind.speed, units.speed)
		);


		return (
			<div className="weather wind">
				<label>
					Ground:
				</label>
				{formatWind(wind.atGround)}<br />

				<label>
					{units.altitude === 'ft' ? 'FL 065:' : '2000 m:'}
				</label>
				{formatWind(wind.at2000)}<br />

				<label>
					{units.altitude === 'ft' ? 'FL 260:' : '8000 m:'}
				</label>
				{formatWind(wind.at8000)}
			</div>
		);
	}
}
