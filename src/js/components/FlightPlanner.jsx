import React from 'react';
import MissionUpload from 'components/MissionUpload';
import Mission from 'components/Mission';
import DateTime from 'components/DateTime';
import WeatherAtmosphere from 'components/WeatherAtmosphere';
import WeatherWind from 'components/WeatherWind';
import UnitsSelector from 'components/UnitsSelector';
import {unitPresets} from 'utils/units';

import mission from 'data/mission';

const MISSION_VERSION = 6;

export default class FlightPlanner extends React.Component {

	constructor(props) {
		var mission = window.localStorage.getItem('dcsfp.mission');
		var units = window.localStorage.getItem('dcsfp.units');

		super(props);

		mission = mission ? JSON.parse(mission) : null;

		if (mission && mission.version !== MISSION_VERSION) {
			alert('This app was updated and your saved mission can no longer be used. Sorry for the inconvinience.');
			window.localStorage.removeItem('dcsfp.mission');
		}

		this.state = {
			mission: mission && mission.version === MISSION_VERSION ? mission : null,
			units: units ? JSON.parse(units) : unitPresets.NATO,
		};
	}

	updateMission(mission) {
		window.localStorage.setItem('dcsfp.mission', JSON.stringify(mission));
		this.setState({mission});
	}

	setUploadedMission(mission) {
		mission.version = MISSION_VERSION;
		mission.flights = mission.flights.map((flight) => Object.assign(flight, {
			collapsed: false,
			route: {
				waypoints: flight.route,
				startupDuration: 0,
				taxiDuration: 0,
			},
			units: {
				speed: null,
				altitude: null,
				distance: null,
			},
		}));

		this.updateMission(mission);
	}

	onMissionTimeChange(missionTime) {
		const mission = this.state.mission;

		mission.date.time = missionTime;
		this.updateMission(mission);
	}

	onFlightChange(updatedFlight) {
		const mission = this.state.mission;
		const flightIndex = mission.flights.findIndex((flight) => updatedFlight.id === flight.id);

		mission.flights[flightIndex] = updatedFlight;

		this.updateMission(mission);
	}

	setUnits(units) {
		window.localStorage.setItem('dcsfp.units', JSON.stringify(units));
		this.setState({units});
	}

	render() {
		const {mission, units} = this.state;

		return (
			<div>
				<header className="page-top">
					<div className="top-box upload-box">
						<MissionUpload
							onUpload={this.setUploadedMission.bind(this)}
						/>
					</div>
					<div className="top-box title-box">
						<h1>
							{mission && mission.name ? mission.name : 'DCS flight planner'}
						</h1>
					</div>
					{mission ? (
						<div className="top-box date-time-box">
							<DateTime
								date={mission.date}
								onChange={this.onMissionTimeChange.bind(this)}
							/>
						</div>
					) : null}
					{mission ? (
						<div className="top-box weather-box">
							<WeatherAtmosphere weather={mission.weather} units={units} />
						</div>
					) : null}
					{mission ? (
						<div className="top-box weather-box">
							<WeatherWind wind={mission.weather.wind} units={units} />
						</div>
					) : null}
					<div className="top-box units-box">
						<UnitsSelector
							units={units}
							onChange={this.setUnits.bind(this)}
						/>
					</div>
				</header>
				{mission ? (
					<Mission
						mission={mission}
						units={units}
						onFlightChange={this.onFlightChange.bind(this)}
					/>
				) : (
					<p className="message">
						Upload DCS mission file.
					</p>
				)}
			</div>
		);
	}
}
