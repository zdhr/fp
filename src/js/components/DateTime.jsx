import React from 'react';
import TimeEdit from 'components/TimeEdit';
import {timeFormat} from 'utils';


export default class DateTime extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			activeEdit: false,
		};
	}

	onStartEdit() {
		this.setState({
			activeEdit: true,
		});
	}

	onCancelEdit() {
		this.setState({
			activeEdit: false,
		});
	}

	onMissionTimeChange(time) {
		this.props.onChange(time);

		this.setState({
			activeEdit: false,
		});
	}

	render() {
		const date = this.props.date;

		return (
			<div className="date-time">
				<div className="date">
					{date.day}. {date.month}. {date.year}
				</div>
				<div className="time">
					{this.state.activeEdit ? (
						<TimeEdit
							time={date.time}
							onChange={this.onMissionTimeChange.bind(this)}
							onCancel={this.onCancelEdit.bind(this)}
						/>
					) : (
						<span onDoubleClick={this.onStartEdit.bind(this)}>
							{timeFormat(date.time)}
						</span>
					)}
				</div>
			</div>
		);
	}
}
