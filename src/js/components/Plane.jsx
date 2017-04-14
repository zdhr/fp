import React from 'react';


export default class Plane extends React.Component {

	render() {
		const {plane} = this.props;

		return (
			<li>
				<span className="name">{plane.name}</span>
				<span className="number">{plane.number}</span>
				<span className="game-callsign">{plane.callsign}</span>
			</li>
		);
	}
}
