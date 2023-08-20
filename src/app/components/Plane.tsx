import React from 'react'
import { FlightPlane } from 'app/types'


interface Props {
	plane: FlightPlane
}


/**
 * Display information for one plane (group unit) in group.
 */
export default function Plane({
	plane,
}: Props) {

	return (
		<li>
			<span className="name">{plane.name}</span>
			<span className="number">{plane.number}</span>
			<span className="game-callsign">{plane.callsign}</span>
		</li>
	)
}
