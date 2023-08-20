import JSZip from 'jszip'
import { List } from 'immutable'
import { luaToJson } from 'utils/luaToJson'

import {
	AltitudeType,
	Clouds,
	Coalition,
	Flight,
	FlightPlane,
	Mission,
	MissionDate,
	Waypoint,
	Weather,
	Wind,
	WindVector,
	WaypointType,
} from './types'


/**
 * Extract relevant info from DCS mission (uploaded .miz file).
 * Miz file is zip archive just with different extension.
 * We need two files from that archive. Both of these are written in lua and
 * are just an assigment of LUA table/object/dictionary into one variable.
 * We need to extract this and convert into JSON, so we can work with it.
 * One of these files is mission file itself and the other one is dictionary
 * with translations.
 * After extraction we'll use those files to create new structure this app uses.
 */


interface ExtractedMission {
	missionLua: string
	dictionaryLua: string
}

// Object, but indexed like an array (sequential numbers). In ideal world,
// this would JS array and not an object.
type LuaArray<T = any> = Record<number, T>

type CountryId = number
type LuaUnitSkill = 'Average' | 'Good' | 'High' | 'Client' | 'Player'

// Real dictionary with translation strings
type TranslationDictionary = Record<string, string>


interface LuaWindVector {
	dir: number
	speed: number
}

interface LuaMissionDate {
	Day: number
	Month: number
	Year: number
}

interface LuaWeather {
	clouds: {
		preset: string
		iprecptns: number
		base: number
		density: number
		thickness: number
	}
	season: {
		temperature: number
	}
	visibility: {
		distance: number
	}
	qnh: number
	wind: {
		atGround: LuaWindVector
		at2000: LuaWindVector
		at8000: LuaWindVector
	}
}

interface LuaWaypoint {
	name: string
	type: WaypointType,
	alt: number
	alt_type: 'BARO',
	ETA: number
	ETA_locked: boolean
	speed: number
	speed_locked: boolean
	x: number,
	y: number,
	// And others we don't care about
}

interface LuaGroupUnit {
	unitId: number
	name: string
	onboard_num: string
	skill: LuaUnitSkill
	type: string
	parking: number
	callsign: {
		name: string
	}
	x: number
	y: number
}

interface LuaGroup {
	groupId: number
	name: string
	task: string
	units: LuaArray<LuaGroupUnit>
	route: {
		points: LuaArray<LuaWaypoint>
	}
}

interface LuaCoalitionCountry {
	id: CountryId
	name: string
	helicopter?: {
		group: LuaArray<LuaGroup>
	}
	plane?: {
		group: LuaArray<LuaGroup>
	}
	// And others we don't care about
}

interface LuaCoalition {
	name: Coalition
	country: LuaArray<LuaCoalitionCountry>
	// And others we don't care about
}

interface LuaMission {
	coalition: { // Assets for each coalition
		blue: LuaCoalition
		neutrals: LuaCoalition
		red: LuaCoalition
	}
	date: LuaMissionDate
	sortie: string
	start_time: number
	weather: LuaWeather
	// And others we don't care about
}


export function extractMission(zip: JSZip): Promise<ExtractedMission> {
	const missionFilePath = 'mission'
	const dictionaryFilePath = 'l10n/DEFAULT/dictionary'

	return Promise.all([
		zip.file(missionFilePath).async('string'),
		zip.file(dictionaryFilePath).async('string'),
	]).then(([missionLua, dictionaryLua]) => ({
		missionLua,
		dictionaryLua,
	}))
}

function convertDate(luaDate: LuaMissionDate, startTime: number): MissionDate {

	return new MissionDate({
		day: luaDate.Day,
		month: luaDate.Month,
		year: luaDate.Year,
		time: startTime,
	})
}

function convertWeather(luaWeather: LuaWeather): Weather {

	return new Weather({
		qnh: luaWeather.qnh,
		clouds: new Clouds(luaWeather.clouds),
		wind: new Wind({
			atGround: new WindVector(luaWeather.wind.atGround),
			at2000: new WindVector(luaWeather.wind.at2000),
			at8000: new WindVector(luaWeather.wind.at8000),
		}),
	})
}

function convertGroup(
	luaGroup: LuaGroup,
	coalition: Coalition,
	country: string,
	dictionaryValue: (key: string) => string,
): Flight {
	const convertPlane = (luaUnit: LuaGroupUnit): FlightPlane => (
		new FlightPlane({
			id: luaUnit.unitId,
			callsign: luaUnit.callsign.name,
			name: luaUnit.name,
			number: luaUnit.onboard_num,
			parking: luaUnit.parking || null,
		})
	)

	const convertPoint = (luaWaypoint: LuaWaypoint): Waypoint => (
		new Waypoint({
			alt: luaWaypoint.alt,
			altType: luaWaypoint.alt_type === 'BARO' ? AltitudeType.msl : AltitudeType.agl,
			eta: luaWaypoint.ETA,
			etaLocked: luaWaypoint.ETA_locked,
			name: luaWaypoint.name,
			speed: luaWaypoint.speed,
			speedLocked: luaWaypoint.speed_locked,
			type: luaWaypoint.type,
			// Coords are flipped in DCS.
			// X in this app is east/west, Y is north/south.
			x: luaWaypoint.y,
			y: luaWaypoint.x,
		})
	)

	return new Flight({
		id: luaGroup.groupId,
		coalition: coalition,
		country: country,
		name: dictionaryValue(luaGroup.name),
		planes: List(Object.values(luaGroup.units).map(convertPlane)),
		route: List(Object.values(luaGroup.route.points).map(convertPoint)),
		task: luaGroup.task,
		type: luaGroup.units[1].type, // 1-based indexing
	})
}


function convertFlights(
	luaCoalitionsAssets: Record<string, LuaCoalition>,
	dictionaryValue: (key: string) => string
): List<Flight> {
	// Fligts/groups we care about are in plane/helicopter keys in countries,
	// which are in turn inside coalitions.
	// We have to dig them out and filter out only playable.

	const isPlayableGroup = (luaGroup: LuaGroup): boolean => (
		Object.values(luaGroup.units)
			.some((unit) => unit.skill === 'Client' || unit.skill === 'Player')
	)

	const getCountryFlights = (
		luaCountry: LuaCoalitionCountry,
		coalition: Coalition,
	): List<Flight> => (
		List(
			Object.values(luaCountry.helicopter?.group || {})
				.concat(Object.values(luaCountry.plane?.group || {}))
				.filter(isPlayableGroup)
				.map((group) => convertGroup(
					group,
					coalition,
					luaCountry.name,
					dictionaryValue,
				))
		)
	)

	const getCoalitionFlights = (luaCoalition: LuaCoalition): List<Flight> => (
		Object.values(luaCoalition.country).reduce((flights, luaCountry) => (
			flights.concat(getCountryFlights(luaCountry, luaCoalition.name))
		), List<Flight>())
	)

	return Object.values(luaCoalitionsAssets).reduce((flights, luaCoalition) => (
		flights.concat(getCoalitionFlights(luaCoalition))
	), List<Flight>())
}

export function parseMission(files: ExtractedMission): Mission {
	const dictionary = luaToJson<TranslationDictionary>(files.dictionaryLua, 'dictionary')
	const luaMission = luaToJson<LuaMission>(files.missionLua, 'mission')

	const dictionaryValue = (key: string): string => (
		key in dictionary ? dictionary[key] : ''
	)

	return new Mission({
		name: dictionaryValue(luaMission.sortie),
		date: convertDate(luaMission.date, luaMission.start_time),
		flights: convertFlights(luaMission.coalition, dictionaryValue),
		weather: convertWeather(luaMission.weather),
	})
}
