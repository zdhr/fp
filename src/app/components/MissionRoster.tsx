import React from 'react'
import { List } from 'immutable'
import { Flight, Mission, UserUnits } from 'app/types'

import RosterFlight from './RosterFlight'


interface Props {
	mission: Mission
	userUnits: UserUnits
	onFlightsChange: (flights: List<Flight>) => void
}


/**
 * Display information / waypoint for each playable flight (group) in mission.
 */
export default function MissionRoster({
	mission,
	userUnits,
	onFlightsChange,
}: Props) {

	return !mission.flights.size ? (
		<p className="message">
			There are no client or player flights in this mission.
		</p>
	) : mission.flights.map((flight, index) => (
		<RosterFlight
			key={index}
			flight={flight}
			userUnits={userUnits}
			missionTime={mission.date.time}
			onChange={(flight) => {
				onFlightsChange(mission.flights.set(index, flight))
			}}
		/>
	))
}
