import React from 'react';
import classNames from 'classnames';
import UnitsSelector from 'components/UnitsSelector';
import Route from 'components/Route';
import Plane from 'components/Plane';
import {cleanObject} from 'utils';


export default class Flight extends React.Component {

	handleToggle(event) {
		const flight = this.props.flight;
		flight.collapsed = !flight.collapsed;

		this.props.onChange(flight);
		event.preventDefault();
	}

	handleUnitsChange(units) {
		const flight = this.props.flight;
		flight.units = units;

		this.props.onChange(flight);
	}

	handleRouteChange(route) {
		const flight = this.props.flight;
		flight.route = route;

		this.props.onChange(flight);
	}

	render() {
		const {flight, missionTime, units} = this.props;
		const routeUnits = Object.assign({}, units, cleanObject(flight.units));

		const wrapperClass = classNames({
			flight: true,
			collapsed: flight.collapsed,
		});

		const toggleClass = classNames({
			toggle: true,
			collapsed: flight.collapsed,
		});

		return (
			<div className={wrapperClass}>
				<header className={'flight-header ' + flight.coalition}>
					<h4>
						{flight.name} / {flight.type} - {flight.task}
					</h4>
					<a href="#" onClick={this.handleToggle.bind(this)} className={toggleClass}>
						{flight.collapsed ? 'show' : 'collapse'}
					</a>
				</header>
				<div className="flight-body">
					<div className="flight-body-top">
						<ol className="planes">
							{flight.planes.map((plane, index) => (
								<Plane key={index} plane={plane} />
							))}
						</ol>
						<UnitsSelector
							clearable={true}
							units={flight.units}
							onChange={this.handleUnitsChange.bind(this)}
						/>
					</div>
					<Route
						route={flight.route}
						units={routeUnits}
						missionTime={missionTime}
						updateRoute={this.handleRouteChange.bind(this)}
					/>
				</div>
			</div>
		);
	}
}
