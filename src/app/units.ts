import { sprintf } from 'sprintf-js'
import { round } from 'utils/numbers'
import { AltitudeType } from 'app/types'


export enum Altitude {
	ft = 'ft',
	m = 'm',
}

export enum Distance {
	km = 'km',
	nm = 'nm',
}

export enum Speed {
	ms = 'ms',
	kmh = 'kmh',
	mph = 'mph',
	kts = 'kts',
}

export enum UnitPreset {
	NATO = 'NATO',
	metric = 'metric',
	custom = 'custom',
}


export const unitNames = {
	[Altitude.ft]: 'ft',
	[Altitude.m]: 'm',
	[Distance.km]: 'km',
	[Distance.nm]: 'NM',
	[Speed.ms]: 'm/s',
	[Speed.kmh]: 'km/h',
	[Speed.mph]: 'mph',
	[Speed.kts]: 'kts',
}

enum Length {
	ft = Altitude.ft,
	m = Altitude.m,
	km = Distance.km,
	nm = Distance.nm,
}

const rates = {
	[Length.m]: {
		[Length.ft]: 3.28084,
		[Length.m]: 1,
		[Length.km]: 0.001,
		[Length.nm]: 1 / 1852,
	},
	[Speed.ms]: {
		[Speed.ms]: 1,
		[Speed.kmh]: 3.6,
		[Speed.mph]: 2.2369311202577,
		[Speed.kts]: 1.94384,
	},
}

function convert(value: number, from: Length.m, to: Length | Altitude | Distance): number
function convert(value: number, from: Speed.ms, to: Speed): number
function convert(value: number, from: any, to: any): number {

	return value * rates[from][to]
}

export function formatDistance(metres: number, unit: Distance): string {

	return sprintf(
		'%.1f %s',
		convert(metres, Length.m, unit),
		unitNames[unit],
	)
}

export function formatAltitude(
	metres: number,
	unit: Altitude,
	type?: AltitudeType,
): string {
	const convertedAltitue = round(
		convert(metres, Length.m, unit),
		(unit === Altitude.ft ? -2 : -1),
	)

	return sprintf(
		'%d %s %s',
		convertedAltitue,
		unitNames[unit],
		type || '',
	).trim()
}

export function formatSpeed(metresPerSecond: number, unit: Speed): string {

	return sprintf(
		'%d %s',
		Math.ceil(convert(metresPerSecond, Speed.ms, unit)),
		unitNames[unit],
	)
}

export function formatHeading(degrees: number, decimals: number = 1): string {

	return sprintf(`%.${decimals}f`, degrees)
}
