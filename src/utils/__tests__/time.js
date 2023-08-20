import { formatSecondsAsTime, parseTimeToSeconds, isValidTimeFormat } from '../time'


describe('formatSecondsAsTime', () => {
	test('Time is formatted correctly', () => {
		expect(formatSecondsAsTime(0)).toBe('00:00:00')
		expect(formatSecondsAsTime(0, true)).toBe('00:00:00')
		expect(formatSecondsAsTime(0, false)).toBe('00:00')

		expect(formatSecondsAsTime(1234)).toBe('00:20:34')
		expect(formatSecondsAsTime(1234, true)).toBe('00:20:34')
		expect(formatSecondsAsTime(1234, false)).toBe('20:34')

		expect(formatSecondsAsTime(11234)).toBe('03:07:14')
		expect(formatSecondsAsTime(11234, true)).toBe('03:07:14')
		expect(formatSecondsAsTime(11234, false)).toBe('03:07:14')
	})
})

describe('parseTimeToSeconds', () => {
	test('Time is parsed correctly', () => {
		expect(parseTimeToSeconds('00:00:00')).toBe(0)
		expect(parseTimeToSeconds('00:20:34')).toBe(1234)
		expect(parseTimeToSeconds('03:07:14')).toBe(11234)
	})
})

describe('isValidTimeFormat', () => {
	test('Time is checked correctly', () => {
		expect(isValidTimeFormat('1:2')).toBe(true)
		expect(isValidTimeFormat('0:00')).toBe(true)
		expect(isValidTimeFormat('00:00')).toBe(true)
		expect(isValidTimeFormat('20:34')).toBe(true)
		expect(isValidTimeFormat('07:14')).toBe(true)
		expect(isValidTimeFormat('00:00:00')).toBe(true)
		expect(isValidTimeFormat('00:20:34')).toBe(true)
		expect(isValidTimeFormat('03:07:14')).toBe(true)

		expect(isValidTimeFormat('fdas')).toBe(false)
		expect(isValidTimeFormat('0d:14')).toBe(false)
		expect(isValidTimeFormat('00:000:00')).toBe(false)
		expect(isValidTimeFormat('00:20:3x4')).toBe(false)
		expect(isValidTimeFormat('03:07:')).toBe(false)
	})
})
