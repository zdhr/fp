import React from 'react'
import { sprintf } from 'sprintf-js'
import { formatAltitude } from 'app/units'
import { UserUnits, Weather } from 'app/types'


interface Props {	weather: Weather,
	userUnits: UserUnits,
}


/**
 * Display atmosphere info from misisn.
 * For now it only uses old (static) DCS weather system.
 */
export default function WeatherAtmosphere({
	weather,
	userUnits,
}: Props) {
	const clouds = weather.clouds
	const altitude = userUnits.altitude

	const cloudsFormatted = sprintf(
		'%d/10; %s - %s',
		clouds.density,
		formatAltitude(clouds.base, altitude),
		formatAltitude(clouds.base + clouds.thickness, altitude)
	)

	return (
		<div className="weather atmosphere">
			<label>Visibility:</label> -<br />
			<label>Clouds:</label> {cloudsFormatted}<br />
			<label>Qnh:</label> {weather.qnh}
		</div>
	)
}
