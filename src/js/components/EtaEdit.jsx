import React from 'react';
import classNames from 'classnames';
import {convertTime, timeFormat} from 'utils';


export default class EtaEdit extends React.Component {
	input

	constructor(props) {
		super(props);

		this.state = {
			eta: timeFormat(props.eta),
		};
	}

	componentDidMount() {
		this.input.focus();
	}

	isTimeValid(eta) {
		return /^[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}$/.test(eta);
	}

	handleChange(event) {
		this.setState({
			eta: event.target.value,
		});
	}

	handleAdjustmentChange(adjustment, event) {
		event.preventDefault();

		this.props.onAdjustmentChange(
			adjustment,
			this.props[adjustment] === 'speed' ? 'eta' : 'speed'
		);
		this.input.focus();
	}

	setEta(event) {
		event.preventDefault();
		this.props.onChange(convertTime(this.state.eta));
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
			this.props.onChange(convertTime(this.state.eta));
		}
	}

	render() {
		const {eta} = this.state;
		const {
			adjustmentBefore,
			adjustmentBeforeLocked,
			adjustmentAfter,
			adjustmentAfterLocked,
		} = this.props;

		const inputClass = classNames({
			'time-input': true,
			'invalid': !this.isTimeValid(eta),
		});

		const beforeClass = classNames('adjustment', 'before', adjustmentBefore, {
			locked: adjustmentBeforeLocked,
		});

		const afterClass = classNames('adjustment', 'after', adjustmentAfter, {
			locked: adjustmentAfterLocked,
		});

		return (
			<div className="eta-edit offset-controls">
				{adjustmentBefore || adjustmentAfter ? (
					<div className="adjustments">
						{adjustmentBefore ? (
							<a href="#"
								className={beforeClass}
								onClick={this.handleAdjustmentChange.bind(this, 'adjustmentBefore')}
							/>
						) : null}
						{adjustmentAfter ? (
							<a href="#"
								className={afterClass}
								onClick={this.handleAdjustmentChange.bind(this, 'adjustmentAfter')}
							/>
						) : null}
					</div>
				) : null}
				<input
					ref={(element) => {this.input = element;}}
					type="text"
					className={inputClass}
					placeholder="hh:mm:ss"
					value={eta}
					onChange={this.handleChange.bind(this)}
					onKeyUp={this.handleKeyUp.bind(this)}
				/>
				<div className="controls">
					<a href="#" className="control set" onClick={this.setEta.bind(this)}></a>
					<a href="#" className="control cancel" onClick={this.cancel.bind(this)}></a>
				</div>
			</div>
		);
	}
}
