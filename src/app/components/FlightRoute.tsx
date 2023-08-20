import React, { useCallback, useMemo, useState } from 'react'
import classNames from 'classnames'
import { List } from 'immutable'
import { formatSecondsAsTime } from 'utils/time'

import { UserUnits, Waypoint } from 'app/types'
import { formatAltitude, formatDistance, formatHeading, formatSpeed } from 'app/units'
import { calculateTableWaypoints, getWaypointName } from 'app/waypoints'

import TimeEdit from './TimeEdit'
import EditableTimeDisplay from './EditableTimeDisplay'
import Button from 'ui/Button'


interface Props {
	waypoints: List<Waypoint>
	preparationTime: number
	missionTime: number
	userUnits: UserUnits
	onPreparationTimeChange: (startupTime: number) => void
	onWaypointsChange: (waypoints: List<Waypoint>) => void
}


/**
 * Display waypoints table with navigational info for each waypint (alt, speed, heading...)
 * preparationTime can be edited to allow enough time for plane startup, taxi and
 * for shifting entire flight plan in time to allow coordination between flights.
 * You can mark/highlight important waypoints to make their time stand out.
 */
export default function FlightRoute({
	waypoints,
	preparationTime,
	missionTime,
	userUnits,
	onPreparationTimeChange,
	onWaypointsChange,
}: Props) {
	const [isPreparationDurationEdited, setIsPreparationTimeEdited] = useState(false)

	const startupTime = missionTime + preparationTime

	const tableWaypoints = useMemo(() => (
		calculateTableWaypoints(waypoints)
	), [waypoints])

	const missionDuration = useMemo(() => (
		tableWaypoints.reduce((missionDuration, wp) => {
			return missionDuration + wp.duration
		}, 0)
	), [tableWaypoints])

	const missionDistance = useMemo(() => (
		tableWaypoints.reduce((missionDistance, wp) => {
			return missionDistance + wp.distance
		}, 0)
	), [tableWaypoints])

	const preparationTimeClass = classNames('right', {
		warning: startupTime < missionTime + 3 * 60,
		// This might have happened becasue of feature that was cut.
		error: startupTime < missionTime,
	})

	const onWaypointMarkToggle = useCallback((index: number): void => {
		const waypoint = waypoints.get(index)

		if (!waypoint) {
			alert(`Waypoint at index ${index} not found`)
		}

		onWaypointsChange(waypoints.set(
			index,
			waypoint.set('isMarked', !waypoint.isMarked),
		))
	}, [waypoints, onWaypointsChange])

	return (
		<table className="route">
			<thead>
				<tr>
					<th className="wp-name" colSpan={2}>
						Waypoint
					</th>
					<th className="right eta">
						Time
					</th>
					<th className="right duration">
						Duration
					</th>
					<th className="right distance">
						Distance
					</th>
					<th className="right speed">
						TAS
					</th>
					<th className="right altitude">
						Altitude
					</th>
					<th className="right heading">
						HDG
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td className="right" />
					<td>
						Startup / Taxi
					</td>
					<td className={preparationTimeClass}>
						{formatSecondsAsTime(startupTime)}
					</td>
					<td className="right">
						{isPreparationDurationEdited ? (
							<TimeEdit
								time={preparationTime}
								onChange={(duration: number) => {
									onPreparationTimeChange(duration)
									setIsPreparationTimeEdited(false)
								}}
								onCancel={() => setIsPreparationTimeEdited(false)}
							/>
						) : (
							<EditableTimeDisplay
								onEditStart={() => setIsPreparationTimeEdited(true)}
								time={preparationTime}
							/>
						)}
					</td>
					<td colSpan={2} />
				</tr>
			</tbody>
			<tbody>
				{tableWaypoints.map((waypoint, index) => (
					<tr key={index}>
						<td className="right">
							<Button
								label={String(waypoint.number)}
								title={waypoint.isMarked ? 'Unmark' : 'Mark'}
								className={classNames('waypoint-mark', {
									'is-marked': waypoint.isMarked,
								})}
								onClick={() => onWaypointMarkToggle(index)}
							/>
						</td>
						<td>
							{getWaypointName(waypoint)}
						</td>
						<td className={classNames('right eta', {
							'marked-waypoint-time': waypoint.isMarked,
						})}>
							{formatSecondsAsTime(startupTime + waypoint.eta)}
						</td>
						<td className="right">
							{formatSecondsAsTime(waypoint.duration, false)}
						</td>
						<td className="right">
							{waypoint.distance ? formatDistance(waypoint.distance, userUnits.distance) : '-'}
						</td>
						<td className="right">
							{waypoint.number > 0 ? formatSpeed(waypoint.speed, userUnits.speed) : '-'}
						</td>
						<td className="right">
							{formatAltitude(waypoint.alt, userUnits.altitude, waypoint.altType)}
						</td>
						<td className="right">
							{waypoint.number > 0 ? formatHeading(waypoint.heading, 0) + '° T' : '-'}
						</td>
					</tr>
				))}
			</tbody>
			<tfoot>
				<tr>
					<td colSpan={3} />
					<td className="right">
						{formatSecondsAsTime(missionDuration, false)}
					</td>
					<td className="right">
						{formatDistance(missionDistance, userUnits.distance)}
					</td>
					<td colSpan={3} />
				</tr>
			</tfoot>
		</table>
	)
}
