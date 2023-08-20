import { List, Record } from 'immutable'
import { Altitude, Distance, Speed } from 'app/units'


export enum AltitudeType {
	agl = 'AGL',
	msl = 'MSL',
}

// Values from DCS
export enum Coalition {
	blue = 'blue',
	red = 'red',
	neutrals = 'neutrals',
}

// Values from DCS
export enum WaypointType {
	groundStart = 'TakeOffGround',
	groundHotStart = 'TakeOffGroundHot',
	rampStart = 'TakeOffParking',
	rampHotStart = 'TakeOffParkingHot',
	runwayStart = 'TakeOff',
	turningPoint = 'Turning Point',
	landing = 'Land',
}

export interface IUserUnits {
	altitude: Altitude
	distance: Distance
	speed: Speed
}

// What user has selected, null means default. When used as override in part of
// UI. Use preset factories when you need something with non-null values.
export class UserUnits extends Record<IUserUnits>({
	altitude: null,
	distance: null,
	speed: null,
}) {}


export class MissionDate extends Record({
	time: 0,
	day: 0,
	month: 0,
	year: 0,
}) {}


export class FlightPlane extends Record({
	id: null as number,
	callsign: null as string,
	name: null as string,
	number: null as string,
	parking: null as number,
}) {}

export class Waypoint extends Record({
	alt: 0,
	altType: AltitudeType.msl,
	eta: 0,
	etaLocked: false,
	name: '',
	speed: 0,
	speedLocked: false,
	type: WaypointType.turningPoint,
	x: 0,
	y: 0,
	isMarked: false as boolean,
}) {}

export class Flight extends Record({
	id: null as number,
	coalition: null as Coalition,
	country: null as string,
	name: null as string,
	planes: List<FlightPlane>(),
	route: List<Waypoint>(),
	task: null as string,
	type: null as string,
	preparationTime: 0,
}) {}


export class WindVector extends Record({
	dir: 0,
	speed: 0,
}) {}

export class Wind extends Record({
	atGround: new WindVector(),
	at2000: new WindVector(),
	at8000: new WindVector(),
}) {}

export class Clouds extends Record({
	base: 0,
	density: 0,
	thickness: 0,
}) {}

export class Weather extends Record({
	qnh: 0,
	clouds: new Clouds(),
	wind: new Wind(),
}) {}


export class Mission extends Record({
	name: null as string,
	date: new MissionDate(),
	flights: List<Flight>(),
	weather: new Weather(),
}) {}

/**
 * Waypoint as displayed in table. With aditional computed values.
 */
export interface TableWaypoint {
	isMarked: boolean
	number: number
	name: string
	type: WaypointType
	alt: number
	altType: AltitudeType
	speed: number
	eta: number
	duration: number
	distance: number
	heading: number
}
