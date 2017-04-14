import React from 'react';
import classNames from 'classnames';
import {convertTime, timeFormat} from 'utils';


export default class TimeEdit extends React.Component {
	input

	constructor(props) {
		super(props);

		this.state = {
			time: timeFormat(props.time, false),
		};
	}

	componentDidMount() {
		this.input.focus();
	}

	isTimeValid(time) {
		return /^([0-9]{1,2}:)?[0-9]{1,2}:[0-9]{1,2}$/.test(time);
	}

	handleChange(event) {
		this.setState({
			time: event.target.value,
		});
	}

	setTime(event) {
		event.preventDefault();
		this.props.onChange(convertTime(this.state.time));
	}

	cancel(event) {
		event.preventDefault();
		this.props.onCancel();
	}

	handleKeyUp(event) {
		if (event.key === 'Escape') {
			this.props.onCancel();
		}

		if (event.key === 'Enter') {
			this.props.onChange(convertTime(this.state.time));
		}
	}

	render() {
		const {time} = this.state;

		const inputClass = classNames({
			'time-input': true,
			'invalid': !this.isTimeValid(time),
		});

		return (
			<div className="time-edit offset-controls">
				<input
					ref={(element) => {this.input = element;}}
					type="text"
					className={inputClass}
					placeholder="hh:mm:ss"
					value={time}
					onChange={this.handleChange.bind(this)}
					onKeyUp={this.handleKeyUp.bind(this)}
				/>
				<div className="controls">
					<a href="#" className="control set" onClick={this.setTime.bind(this)}></a>
					<a href="#" className="control cancel" onClick={this.cancel.bind(this)}></a>
				</div>
			</div>
		);
	}
}
