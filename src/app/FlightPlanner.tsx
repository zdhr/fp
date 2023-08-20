import React, { useEffect, useState } from 'react'
import { List } from 'immutable'

import { Flight, Mission, UserUnits } from 'app/types'
import { loadMission, loadUserUnits, saveMission, saveUserUnits } from 'app/localStorage'

import MissionControl from 'app/components/MissionControl'
import MissionDateTime from 'app/components/MissionDateTime'
import MissionRoster from 'app/components/MissionRoster'
import UnitsSelector from 'app/components/UnitsSelector'
import WeatherAtmosphere from 'app/components/WeatherAtmosphere'
import WeatherWind from 'app/components/WeatherWind'


export default function FlightPlanner() {
	const [userUnits, setUserUnits] = useState<UserUnits>(() => loadUserUnits())
	const [mission, setMission] = useState<Mission>(() => loadMission())


	const onMissionTimeChange = (time: number): void => {
		setMission(mission.setIn(['date', 'time'], time))
	}

	const onFlightsChange = (flights: List<Flight>): void => {
		setMission(mission.set('flights', flights))
	}


	useEffect(() => {
		saveUserUnits(userUnits)
	}, [userUnits])

	useEffect(() => {
		saveMission(mission)
	}, [mission])


	return (
		<div>
			<header className="page-top">
				<div className="top-left">
					<MissionControl
						canReset={Boolean(mission)}
						onLoaded={setMission}
					/>
					<h1
						children={mission && mission.name ?
							mission.name :
							'DCS flight planner'
						}
					/>
				</div>
				<div className="top-right">
					{mission && (
						<>
							<MissionDateTime
								date={mission.date}
								onTimeChange={onMissionTimeChange}
							/>
							<WeatherAtmosphere
								weather={mission.weather}
								userUnits={userUnits}
							/>
							<WeatherWind
								wind={mission.weather.wind}
								userUnits={userUnits}
							/>
						</>
					)}
					<UnitsSelector
						userUnits={userUnits}
						onChange={setUserUnits}
					/>
				</div>
			</header>
			{mission ? (
				<MissionRoster
					mission={mission}
					userUnits={userUnits}
					onFlightsChange={onFlightsChange}
				/>
			) : (
				<p className="message">
					Upload DCS mission file.
				</p>
			)}
		</div>
	)
}
