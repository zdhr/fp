import React from 'react';
import classNames from 'classnames';
import {timeFormat} from 'utils';
import {displayUnit} from 'utils/units';
import EtaEdit from 'components/EtaEdit';
import TimeEdit from 'components/TimeEdit';


const waypointNames = {
	'TakeOff': 'Scramble',
	'TakeOffParking': 'Take off',
	'TakeOffParkingHot': 'Take off (hot)',
	'TakeOffGround': 'Take off',
	'TakeOffGroundHot': 'Take off (hot)',
	'Turning Point': 'WP',
	'Land': 'Landing',
}


export default class Route extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			activeEdit: null,
			adjustmentBefore: 'speed',
			adjustmentAfter: 'speed',
		};

		this.isStartupDurationEdited = this.isStartupDurationEdited.bind(this);
		this.isTaxiDurationEdited = this.isTaxiDurationEdited.bind(this);
		this.isWaypointEtaEdited = this.isWaypointEtaEdited.bind(this);
	}


	/*
	 * Helpers
	 */

	isStartupDurationEdited() {
		return this.state.activeEdit === 'startupDuration';
	}

	isTaxiDurationEdited() {
		return this.state.activeEdit === 'taxiDuration';
	}

	isWaypointEtaEdited(waypointNumber) {
		return this.state.activeEdit === 'wp' + waypointNumber;
	}


	/*
	 * Event listeners
	 */

	onStartEdit(item, event) {
		const activeEdit = this.state.activeEdit;
		const confirmMessage = (
			this.isStartupDurationEdited() ? 'Cancel editation of startup time?' :
			this.isTaxiDurationEdited() ?  'Cancel editation of taxi time?' :
			activeEdit ? 'Cancel editation of waypoint no. ' + activeEdit.replace('wp', '') + '?' :
			null
		);

		if (activeEdit && !confirm(confirmMessage)) {
			return;
		}

		event.preventDefault();
		this.setState({
			activeEdit: typeof item === 'number' ? 'wp' + item : item,
		});
	}

	onStartupDurationChange(startupDuration) {
		const route = this.props.route;

		route.startupDuration = startupDuration;

		this.props.updateRoute(route);
		this.setState({
			activeEdit: null,
		});
	}

	onTaxiDurationChange(taxiDuration) {
		const route = this.props.route;

		route.taxiDuration = taxiDuration;

		this.props.updateRoute(route);
		this.setState({
			activeEdit: null,
		});
	}

	onWaypointEtaChange(waypointNumber, eta) {
		const {adjustmentBefore, adjustmentAfter} = this.state;
		const {missionTime, route} = this.props;
		const index = route.waypoints.findIndex((waypoint) => waypoint.number === waypointNumber);
		const waypoint = route.waypoints[index];

		eta = eta - missionTime;

		if (adjustmentBefore === 'eta') {
			let deltaTime = waypoint.eta - eta;

			for (let i = 0; i < waypoint.number; i++) {
				route.waypoints[i].eta -= deltaTime;
			}
		} else if (adjustmentBefore === 'speed' && index > 0) {
			const prevWaypoint = route.waypoints[index - 1];

			waypoint.duration = eta - prevWaypoint.eta;
			waypoint.speed = waypoint.duration > 0 ? waypoint.distance / waypoint.duration : 0;
		}

		if (adjustmentAfter === 'eta') {
			let deltaTime = waypoint.eta - eta;

			for (let i = index + 1; i < route.waypoints.length; i++) {
				route.waypoints[i].eta -= deltaTime;
			}
		} else if (adjustmentAfter === 'speed' && (index + 1) < route.waypoints.length) {
			const nextWaypoint = route.waypoints[index + 1];

			nextWaypoint.duration = nextWaypoint.eta - eta;
			nextWaypoint.speed = nextWaypoint.duration > 0 ? nextWaypoint.distance / nextWaypoint.duration : 0;
			route.waypoints[index + 1] = nextWaypoint;
		}

		waypoint.eta = eta;
		waypoint.etaLocked = waypoint.etaLocked || adjustmentBefore === 'speed' || adjustmentAfter === 'speed';
		waypoint.speedLocked = !waypoint.etaLocked;

		route.waypoints[index] = waypoint;

		this.props.updateRoute(route);
		this.setState({
			activeEdit: null,
			adjustmentBefore,
			adjustmentAfter,
		});
	}

	onCancelEdit() {
		this.setState({
			activeEdit: null,
		});
	}

	onAdjustmentChange(direction, adjustment) {
		const state = this.state;

		state[direction] = adjustment;
		this.setState(state);
	}

	render() {
		const {activeEdit, adjustmentBefore, adjustmentAfter} = this.state;
		const {route, missionTime, units} = this.props;

		const taxiTime = route.waypoints[0].eta - route.taxiDuration + missionTime;
		const startupTime = taxiTime - route.startupDuration;

		const durationSum = route.waypoints.reduce((sum, waypoint) => sum + waypoint.duration, 0);
		const distanceSum = route.waypoints.reduce((sum, waypoint) => sum + waypoint.distance, 0);

		const startupTimeClass = classNames({
			right: true,
			warning: startupTime < missionTime + 3 * 60,
			error: startupTime < missionTime,
		});

		const taxiTimeClass = classNames({
			right: true,
			warning: taxiTime < missionTime + 3 * 60,
			error: taxiTime < missionTime,
		});

		return (
			<table className="route">
				<thead>
					<tr>
						<th className="wp-name" colSpan="2">
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
						<td className="right">
						</td>
						<td>
							Start up
						</td>
						<td className={startupTimeClass}>
							{timeFormat(startupTime)}
						</td>
						<td className="right">
							{this.isStartupDurationEdited() ? (
								<TimeEdit
									time={route.startupDuration}
									onChange={this.onStartupDurationChange.bind(this)}
									onCancel={this.onCancelEdit.bind(this)}
								/>
							) : (
								<span onDoubleClick={this.onStartEdit.bind(this, 'startupDuration')}>
									{timeFormat(route.startupDuration, false)}
								</span>
							)}
						</td>
						<td colSpan="2">
						</td>
					</tr>
					<tr>
						<td className="right">
						</td>
						<td>
							Taxi
						</td>
						<td className={taxiTimeClass}>
							{timeFormat(taxiTime)}
						</td>
						<td className="right">
							{this.isTaxiDurationEdited() ? (
								<TimeEdit
									time={route.taxiDuration}
									onChange={this.onTaxiDurationChange.bind(this)}
									onCancel={this.onCancelEdit.bind(this)}
								/>
							) : (
								<span onDoubleClick={this.onStartEdit.bind(this, 'taxiDuration')}>
									{timeFormat(route.taxiDuration, false)}
								</span>
							)}
						</td>
						<td colSpan="2">
						</td>
					</tr>
				</tbody>
				<tbody>
					{route.waypoints.map((waypoint, index) => (
						<tr key={index}>
							<td className="right">
								{waypoint.number}
							</td>
							<td>
								{waypoint.name ? waypoint.name : waypointNames[waypoint.type] || waypoint.type}
							</td>
							<td className="right eta">
								{this.isWaypointEtaEdited(waypoint.number) ? (
									<EtaEdit
										eta={missionTime + waypoint.eta}
										adjustmentBefore={index === 0 ? 'eta' : adjustmentBefore}
										adjustmentBeforeLocked={index === 0}
										adjustmentAfter={(index + 1) === route.waypoints.length ? null : adjustmentAfter}
										onCancel={this.onCancelEdit.bind(this)}
										onChange={this.onWaypointEtaChange.bind(this, waypoint.number)}
										onAdjustmentChange={this.onAdjustmentChange.bind(this)}
									/>
								) : (
									<span onDoubleClick={this.onStartEdit.bind(this, waypoint.number)}>
										{timeFormat(missionTime + waypoint.eta)}
									</span>
								)}
							</td>
							<td className="right">
								{timeFormat(waypoint.duration, false)}
							</td>
							<td className="right">
								{waypoint.distance ? displayUnit.distance(waypoint.distance, units.distance) : '-'}
							</td>
							<td className="right">
								{waypoint.number > 0 ? displayUnit.speed(waypoint.speed, units.speed) : '-'}
							</td>
							<td className="right">
								{displayUnit.altitude(waypoint.alt, waypoint.altType, units.altitude)}
							</td>
							<td className="right">
								{waypoint.number > 0 ? displayUnit.heading(waypoint.heading, 0) + '° T' : '-'}
							</td>
						</tr>
					))}
				</tbody>
				<tfoot>
					<tr>
						<td colSpan="3">
						</td>
						<td className="right">
							{timeFormat(durationSum, false)}
						</td>
						<td className="right">
							{displayUnit.distance(distanceSum, units.distance)}
						</td>
						<td colSpan="3">
						</td>
					</tr>
				</tfoot>
			</table>
		);
	}
}
