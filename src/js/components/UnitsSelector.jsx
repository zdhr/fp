import React from 'react';
import {cleanObject} from 'utils';
import {supportedUnits, unitPresets, unitNames} from 'utils/units';


export default class UnitsSelector extends React.Component {

	handleClick(unit, event) {
		event.preventDefault();
		this.props.onChange(unit);
	}

	handleUnitClick(quantity, unit, event) {
		const units = this.props.units;

		units[quantity] = unit;

		this.props.onChange(units);
		event.preventDefault();
	}

	handleClearUnitClick(quantity, event) {
		const units = this.props.units;

		if (units[quantity]) {
			delete units.quantity;
		}

		this.props.onChange(units);
		event.preventDefault();
	}

	handlePresetClick(preset, event) {
		this.props.onChange(unitPresets[preset]);
		event.preventDefault();
	}

	handleClearClick(event) {
		this.props.onChange({});
		event.preventDefault();
	}

	getPreset(units) {
		const {altitude, distance, speed} = units;

		if (altitude === 'ft' && distance === 'nm' && speed === 'kn') {
			return 'NATO';
		}

		if (altitude === 'm' && distance === 'km' && speed === 'kmh') {
			return 'metric';
		}

		return 'custom';
	}

	render() {
		const {units, clearable} = this.props;
		const presets = ['NATO', 'metric'];
		const quantities = ['altitude', 'distance', 'speed'];

		const currentPreset = this.getPreset(units);
		const active = Object.keys(cleanObject(units)).length;

		return (
			<div className={'units-selector ' + (active ? 'active' : '')}>
				<ul className="presets">
					{presets.map((preset) => (
						<li key={preset}>
							<a
								href="#"
								onClick={this.handlePresetClick.bind(this, preset)}
								className={currentPreset === preset ? 'active' : ''}
							>
								{preset}
							</a>
						</li>
					))}
					{clearable ? (
						<li key={'clear'}>
							<a href="#" onClick={this.handleClearClick.bind(this)}>
								clear all
							</a>
						</li>
					) : (
						<li key={'custom'}>
							<span className={'a-like ' + (currentPreset === 'custom' ? 'active' : '')}>
								custom
							</span>
						</li>
					)}
				</ul>
				<ul className="quantities">
					{quantities.map((quantity) => (
						<li key={quantity} className="quantity">
							<label>{quantity}:</label>
							{clearable ? (
								<a
									href="#"
									key={'clear'}
									className={units[quantity] === null ? 'active' : ''}
									onClick={this.handleUnitClick.bind(this, quantity, null)}
								>
									X
								</a>
							) : null}
							{supportedUnits[quantity].map((unit) => (
								<a
									href="#"
									key={unit}
									className={unit === units[quantity] ? 'active' : ''}
									onClick={this.handleUnitClick.bind(this, quantity, unit)}
								>
									{unitNames[unit]}
								</a>
							))}
						</li>
					))}
				</ul>
			</div>
		);
	}
}
