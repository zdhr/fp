import React from 'react'
import { sprintf } from 'sprintf-js'
import { UserUnits, Wind, WindVector } from 'app/types'
import { Altitude, formatSpeed } from 'app/units'


interface Props {
	wind: Wind
	userUnits: UserUnits
}


/**
 * Display wind info from misisn.
 * For now it only uses old (static) DCS weather system.
 */
export default function WeatherWind({
	wind,
	userUnits,
}: Props) {
	const formatWind = (wind: WindVector): string => (
		sprintf('%d@%s', wind.dir, formatSpeed(wind.speed, userUnits.speed))
	)

	return (
		<div className="weather wind">
			<label>
				Ground:
			</label>
			{formatWind(wind.atGround)}<br />
			<label>
				{userUnits.altitude === Altitude.ft ? 'FL 065:' : '2000 m:'}
			</label>
			{formatWind(wind.at2000)}<br />
			<label>
				{userUnits.altitude === Altitude.ft ? 'FL 260:' : '8000 m:'}
			</label>
			{formatWind(wind.at8000)}
		</div>
	)
}
