import { AltitudeType } from 'app/types'
import { formatDistance, formatAltitude, formatSpeed, formatHeading, Distance, Altitude, Speed } from '../units'


describe('formatDistance', () => {
	test('Distance is formatted properly', () => {
		expect(formatDistance(100, Distance.km)).toEqual('0.1 km')
		expect(formatDistance(1852, Distance.nm)).toEqual('1.0 NM')
	})
})

describe('formatAltitude', () => {
	test('Altitude is formatted properly', () => {
		expect(formatAltitude(150, Altitude.ft)).toEqual('500 ft')
		expect(formatAltitude(15000, Altitude.ft)).toEqual('49200 ft')
		expect(formatAltitude(20, Altitude.m)).toEqual('20 m')
		expect(formatAltitude(2000, Altitude.m)).toEqual('2000 m')

		expect(formatAltitude(150, Altitude.ft, AltitudeType.agl)).toEqual('500 ft AGL')
		expect(formatAltitude(15000, Altitude.ft, AltitudeType.msl)).toEqual('49200 ft MSL')
		expect(formatAltitude(20, Altitude.m, AltitudeType.agl)).toEqual('20 m AGL')
		expect(formatAltitude(2000, Altitude.m, AltitudeType.msl)).toEqual('2000 m MSL')
	})
})

describe('formatSpeed', () => {
	test('Speed is formatted properly', () => {
		expect(formatSpeed(300, Speed.ms)).toEqual('300 m/s')
		expect(formatSpeed(300, Speed.kmh)).toEqual('1080 km/h')
		expect(formatSpeed(300, Speed.mph)).toEqual('672 mph')
		expect(formatSpeed(300, Speed.kts)).toEqual('584 kts')
	})
})

describe('formatHeading', () => {
	test('Heading is formatted properly', () => {
		expect(formatHeading(300.123, 0)).toEqual('300')
		expect(formatHeading(300.123)).toEqual('300.1')
		expect(formatHeading(300.123, 1)).toEqual('300.1')
		expect(formatHeading(300.123, 2)).toEqual('300.12')
	})
})
