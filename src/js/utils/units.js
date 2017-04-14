import {sprintf} from 'sprintf-js';
import {round} from 'utils';

const rates = {
	m: {
		ft: 3.28084,
		m: 1,
		km: 0.001,
		nm: 1/1852,
	},
	ms: {
		ms: 1,
		kmh: 3.6,
		mph: 2.2369311202577,
		kn: 1.94384,
	},
};

export const unitNames = {
	ft: 'ft',
	m: 'm',
	km: 'km',
	nm: 'NM',
	ms: 'm/s',
	kmh: 'km/h',
	mph: 'mph',
	kn: 'kn',
}

export const supportedUnits = {
	altitude: ['ft', 'm'],
	distance: ['nm', 'km'],
	speed: ['kn', 'mph', 'kmh', 'ms'],
};

export const unitPresets = {
	NATO: {
		speed: 'kn',
		altitude: 'ft',
		distance: 'nm',
	},
	metric: {
		speed: 'kmh',
		altitude: 'm',
		distance: 'km',
	},
};

export const convert = (value, from, to) => value * rates[from][to];

export const displayUnit = {

	distance: (value, unit) => sprintf(
		'%.1f %s', convert(value, 'm', unit), unitNames[unit]
	),

	altitude: (value, type, unit) => sprintf(
		'%d %s %s',
		round(convert(value, 'm', unit), (unit === 'ft' ? -2 : -1)),
		unitNames[unit],
		type
	),

	speed: (value, unit) => sprintf(
		'%d %s', Math.ceil(convert(value, 'ms', unit)), unitNames[unit]
	),

	heading: (value, decimals = 1) => sprintf(
		'%.' + decimals + 'f', value
	),
};
