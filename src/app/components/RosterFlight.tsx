import React, { useState } from 'react'
import classNames from 'classnames'
import useOnPropChange from 'utils/useOnPropChange'
import { Flight, UserUnits, Waypoint } from 'app/types'

import Button from 'ui/Button'
import Plane from './Plane'
import FlightRoute from './FlightRoute'
import UnitsSelector from './UnitsSelector'
import { cleanObject } from 'utils/objects'
import { List } from 'immutable'


interface Props {
	flight: Flight
	missionTime: any
	userUnits: UserUnits
	onChange: (flight: Flight) => void
}


/**
 * Display information & navigation table for one flight (group) from mission.
 * Component for this can be minimized/collapsed if needed.
 * There is also option select to different units for navigation table if needed.
 * This is useful when there are planes with different instruments (mixed NATO & metric),
 * so each group can view values in their native units.
 */
export default function RosterFlight({
	flight,
	missionTime,
	userUnits,
	onChange,
}: Props) {
	const [isCollapsed, setIsCollased] = useState(false)
	const [flightUnits, setFlightUnits] = useState(new UserUnits())
	useOnPropChange(userUnits, setFlightUnits)

	const usedUnits = userUnits.merge(cleanObject(flightUnits.toJS()))

	const wrapperClass = classNames('roster-flight', {
		collapsed: isCollapsed,
	})

	const toggleClass = classNames('flight-toggle-button', {
		collapsed: isCollapsed,
	})

	return (
		<div className={wrapperClass}>
			<header className={'flight-header ' + flight.coalition}>
				<h4>
					{flight.name} / {flight.type} - {flight.task}
				</h4>
				<Button
					label=""
					title={isCollapsed ? 'Show flight' : 'Collapse flight'}
					className={toggleClass}
					onClick={() => setIsCollased(!isCollapsed)}
				/>
			</header>
			<div className="flight-body">
				<div className="flight-body-top">
					<ol className="planes">
						{flight.planes.map((plane, index) => (
							<Plane key={index} plane={plane} />
						))}
					</ol>
					<UnitsSelector
						clearable={true}
						userUnits={flightUnits}
						onChange={setFlightUnits}
					/>
				</div>
				<FlightRoute
					waypoints={flight.route}
					preparationTime={flight.preparationTime}
					userUnits={usedUnits}
					missionTime={missionTime}
					onPreparationTimeChange={(preparationTime: number) => (
						onChange(flight.set('preparationTime', preparationTime))
					)}
					onWaypointsChange={(waypoints: List<Waypoint>) => (
						onChange(flight.set('route', waypoints))
					)}
				/>
			</div>
		</div>
	)
}
