import createListOf from 'utils/collectionFactories/list'
import { getDistance, getHeading, calculateTableWaypoints } from '../waypoints'
import { createWaypoint } from 'app/factories'


// Waypoints are in a square, north west = nw and so on
const nw = {x:0, y: 100}
const ne = {x:100, y: 100}
const se = {x:100, y: 0}
const sw = {x: 0, y: 0}


describe('getDistance', () => {
	test('Distance is calculated properly', () => {
		expect(getDistance(nw, ne)).toBe(100)
		expect(getDistance(nw, sw)).toBe(100)
		expect(Math.round(getDistance(nw, se))).toBe(141)
	})
})

describe('getHeading', () => {
	test('Heading is calculated properly', () => {
		expect(getHeading(nw, ne)).toBe(90)
		expect(getHeading(ne, se)).toBe(180)
		expect(getHeading(se, sw)).toBe(270)
		expect(getHeading(sw, nw)).toBe(0)

		expect(getHeading(sw, ne)).toBe(45)
		expect(getHeading(nw, se)).toBe(135)
		expect(getHeading(ne, sw)).toBe(225)
		expect(getHeading(se, nw)).toBe(315)
	})
})

describe('calculateTableWaypoints', () => {
	test('Table waypoints are calculatd properly', () => {
		const waypoints = createListOf([{
			"alt": 2000,
			"altType": "MSL",
			"eta": 0,
			"etaLocked": true,
			"name": "",
			"speed": 220.97222222222,
			"speedLocked": true,
			"type": "TakeOffGroundHot",
			"x": 326047.4461637,
			"y": 132312.06730975,
			"isMarked": false
		}, {
			"alt": 6705.6,
			"altType": "MSL",
			"eta": 20.358368433009,
			"etaLocked": false,
			"name": "INGRESS",
			"speed": 220.97222222222,
			"speedLocked": true,
			"type": "Turning Point",
			"x": 229211.99604202,
			"y": 53980.331872021,
			"isMarked": true
		}, {
			"alt": 413,
			"altType": "MSL",
			"eta": 809.42385847056,
			"etaLocked": false,
			"name": "SA-6",
			"speed": 220.97222222222,
			"speedLocked": true,
			"type": "Turning Point",
			"x": 175769.41253507,
			"y": 44317.3960594,
			"isMarked": false
		}], createWaypoint)

		const expected = [{
			alt: 2000,
			altType: 'MSL',
			distance: 0,
			duration: 0,
			eta: 0,
			heading: 0,
			isMarked: false,
			name: '',
			number: 0,
			speed: 220.97222222222,
			type: 'TakeOffGroundHot',
		}, {
			alt: 6705.6,
			altType: 'MSL',
			distance: 124551.05449956957,
			duration: 20.358368433009,
			eta: 20.358368433009,
			heading: 231.03005368970503,
			isMarked: true,
			name: 'INGRESS',
			number: 1,
			speed: 220.97222222222,
			type: 'Turning Point',
		}, {
			alt: 413,
			altType: 'MSL',
			distance: 54309.13422635421,
			duration: 789.0654900375511,
			eta: 809.42385847056,
			heading: 259.7510979212609,
			isMarked: false,
			name: 'SA-6',
			number: 2,
			speed: 220.97222222222,
			type: 'Turning Point',
		}]

		expect(calculateTableWaypoints(waypoints)).toEqual(expected)
	})
})
