import React from 'react';
import Flight from 'components/Flight';

export default class Mission extends React.Component {

	render() {
		const {mission, units, onFlightChange} = this.props;

		return !mission.flights.length ? (
			<p className="message">
				No client of player flights in this mission.
			</p>
		) : (
			<div>
				{mission.flights.map((flight, index) => (
					<Flight
						key={index}
						flight={flight}
						units={units}
						missionTime={mission.date.time}
						onChange={onFlightChange}
					/>
				))}
			</div>
		);
	}
}
