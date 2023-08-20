import { radiansToDegrees } from 'utils/numbers'
import { TableWaypoint, Waypoint, WaypointType } from './types'
import { List } from 'immutable'


/**
 * Calculate additinal information for waypoints, like headings and leg times.
 */


/**
 * Get distance between two waypoints.
 */
export function getDistance(a: Waypoint, b: Waypoint): number {
	const dx = Math.abs(a.x - b.x)
	const dy = Math.abs(a.y - b.y)

	return Math.sqrt(dx * dx + dy * dy)
}

/**
 * Get true heading from first provided waypoint to the second one.
 */
export function getHeading(origin: Waypoint, target: Waypoint): number {
	if (origin.y === target.y) {
		return origin.x > target.x ? 270 : 90
	}

	if (origin.x === target.x) {
		return origin.y > target.y ? 180 : 0
	}

	const dx = Math.abs(origin.x - target.x)
	const dy = Math.abs(origin.y - target.y)
	const vertical = origin.y > target.y ? 'S' : 'N'
	const horizontal = origin.x > target.x ? 'W' : 'E'

	switch (vertical + horizontal) {
		case 'NE':
			return radiansToDegrees(Math.atan(dx / dy))
		case 'SE':
			return radiansToDegrees(Math.atan(dy / dx)) + 90
		case 'SW':
			return radiansToDegrees(Math.atan(dx / dy)) + 180
		case 'NW':
			return radiansToDegrees(Math.atan(dy / dx)) + 270
		default:
			// Fallback, shouldn't really get here.
			return 0
	}
}

/**
 * Calculate headings / times from mission waypoints and return waypoints in
 * suitable format for navigation table display.
 */
export function calculateTableWaypoints(
	waypoints: List<Waypoint>
): TableWaypoint[] {
	let prevWp = null
	const table: TableWaypoint[] = []

	waypoints.forEach((wp) => {
		table.push({
			number: table.length,
			name: wp.name,
			type: wp.type,
			alt: wp.alt,
			altType: wp.altType,
			speed: wp.speed,
			eta: wp.eta,
			duration: prevWp ? Math.max(wp.eta - prevWp.eta, 0) : 0,
			distance: prevWp ? getDistance(prevWp, wp) : 0,
			heading: prevWp ? getHeading(prevWp, wp) : 0,
			isMarked: wp.isMarked,
		})

		prevWp = wp
	})

	return table
}

/**
 * Get waypoint name.
 * Use defined name if there is one or name according to type othervise.
 */
export function getWaypointName(waypoint: Waypoint | TableWaypoint): string {
	if (waypoint.name) {
		return waypoint.name
	}

	const typeNames = {
		[WaypointType.groundStart]: 'T/O (Ramp)',
		[WaypointType.groundHotStart]: 'T/O (Ramp, hot)',
		[WaypointType.rampStart]: 'T/O (Ramp)',
		[WaypointType.rampHotStart]: 'T/O (Ramp, hot)',
		[WaypointType.runwayStart]: 'T/O (Runway)',
		[WaypointType.turningPoint]: 'WP',
		[WaypointType.landing]: 'Landing',
	}

	return waypoint.type in typeNames ? typeNames[waypoint.type] : 'WP'
}
