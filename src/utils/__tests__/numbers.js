import { round, radiansToDegrees } from '../numbers'


describe('round', () => {
	test('Numbers are rounded properly', () => {
		expect(round(123.456, -2)).toBe(100)
		expect(round(123.456, -1)).toBe(120)
		expect(round(123.456, 0)).toBe(123)
		expect(round(123.456, 1)).toBe(123.5)
		expect(round(123.456, 2)).toBe(123.46)
	})
})

describe('radiansToDegrees', () => {
	test('Degrees are converted properly', () => {
		expect(Math.round(radiansToDegrees(1))).toBe(57)
		expect(radiansToDegrees(Math.PI / 2)).toBe(90)
		expect(radiansToDegrees(3 * Math.PI / 2)).toBe(270)
	})
})
