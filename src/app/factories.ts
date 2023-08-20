import { Altitude, Distance, Speed } from 'app/units'
import {
	UserUnits,
	MissionDate,
	FlightPlane,
	Waypoint,
	Flight,
	WindVector,
	Wind,
	Clouds,
	Weather,
	Mission,
} from 'app/types'
import createListOf from 'utils/collectionFactories/list'


export const createUserUnits = (userUnits): UserUnits => (
	new UserUnits(userUnits)
)

export const createNatoUnits = (): UserUnits => (
	new UserUnits({
		altitude: Altitude.ft,
		distance: Distance.nm,
		speed: Speed.kts,
	})
)

export const createMetricUnits = (): UserUnits => (
	new UserUnits({
		altitude: Altitude.m,
		distance: Distance.km,
		speed: Speed.kmh,
	})
)

export const createMissionDate = (missionDate): MissionDate => (
	new MissionDate(missionDate)
)

export const createFlightPlane = (flightPlane): FlightPlane => (
	new FlightPlane(flightPlane)
)

export const createWaypoint = (waypoint): Waypoint => (
	new Waypoint(waypoint)
)

export const createFlight = (flight): Flight => (
	new Flight({
		...flight,
		planes: createListOf(flight.planes, createFlightPlane),
		route: createListOf(flight.route, createWaypoint),
	})
)

export const createWindVector = (windVector): WindVector => (
	new WindVector(windVector)
)

export const createWind = (wind): Wind => (
	new Wind({
		atGround: createWindVector(wind.atGround),
		at2000: createWindVector(wind.at2000),
		at8000: createWindVector(wind.at8000),
	})
)

export const createClouds = (clouds): Clouds => (
	new Clouds(clouds)
)

export const createWeather = (weather): Weather => (
	new Weather({
		...weather,
		clouds: createClouds(weather.clouds),
		wind: createWind(weather.wind),
	})
)

export const createMission = (mission): Mission => (
	new Mission({
		...mission,
		date: createMissionDate(mission.date),
		weather: createWeather(mission.weather),
		flights: createListOf(mission.flights, createFlight),
	})
)
