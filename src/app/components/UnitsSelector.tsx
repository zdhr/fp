import React from 'react'
import classNames from 'classnames'
import { cleanObject } from 'utils/objects'

import { createMetricUnits, createNatoUnits } from 'app/factories'
import { IUserUnits, UserUnits } from 'app/types'
import { Altitude, Distance, Speed, UnitPreset, unitNames } from 'app/units'

import Button from 'ui/Button'


interface Props {
	userUnits: UserUnits
	clearable?: boolean
	onChange: (userUnits: UserUnits) => void
}


const supportedUnits = {
	altitude: [Altitude.ft, Altitude.m],
	distance: [Distance.nm, Distance.km],
	speed: [Speed.kts, Speed.mph, Speed.kmh, Speed.ms],
}


function getPresetFromUnits(userUnits: UserUnits): UnitPreset {
	if (userUnits.equals(createNatoUnits())) {
		return UnitPreset.NATO
	}

	if (userUnits.equals(createMetricUnits())) {
		return UnitPreset.metric
	}

	return UnitPreset.custom
}


/**
 * Control which allows user to select which units to use for which measurement.
 * Can be used globally (clearable should be false and resulting value should
 * have all values set) or locally (eg. per flight) as an override. In that case
 * clearable can be true and not every measurements needs to have unit set.
 * Globally selected unit will be used for such measurements.
 * Also provide way to quickly select units that commonly used together via
 * NATO & metric presets.
 */
export default function UnitsSelector({
	userUnits,
	clearable = false,
	onChange,
}: Props) {
	const measurements: (keyof IUserUnits)[] = ['altitude', 'distance', 'speed']
	const selectablePresets: Record<string, () => UserUnits> = {
		[UnitPreset.NATO]: createNatoUnits,
		[UnitPreset.metric]: createMetricUnits,
	}

	const currentPreset = getPresetFromUnits(userUnits)
	const active = Object.keys(cleanObject(userUnits.toJS())).length

	const onClearClick = (): void => {
		onChange(new UserUnits({
			altitude: null,
			distance: null,
			speed: null,
		}))
	}

	const onUnitSelect = (quantity, unit): void => {
		onChange(userUnits.set(quantity, unit))
	}

	return (
		<div className={'units-selector ' + (active ? 'active' : '')}>
			<ul className="presets">
				{Object.entries(selectablePresets).map(([preset, presetFactory]) => (
					<li key={preset}>
						<Button
							label={preset}
							className={currentPreset === preset ? 'active' : ''}
							onClick={() => onChange(presetFactory())}
						/>
					</li>
				))}
				{clearable ? (
					<li key={'clear'}>
						<Button
							label="clear all"
							onClick={onClearClick}
						/>
					</li>
				) : (
					<li key={'custom'}>
						<span
							className={classNames('button-like', {
								active: currentPreset === UnitPreset.custom,
							})}
							children="custom"
						/>
					</li>
				)}
			</ul>
			<ul>
				{measurements.map((measurement) => (
					<li key={measurement}>
						<label>{measurement}:</label>
						{clearable && (
							<Button
								key="clear"
								label="&times;"
								className={userUnits.get(measurement) === null ? 'active' : ''}
								onClick={() => onUnitSelect(measurement, null)}
							/>
						)}
						{supportedUnits[measurement].map((unit) => (
							<Button
								key={unit}
								label={unitNames[unit]}
								className={unit === userUnits.get(measurement) ? 'active' : ''}
								onClick={() => onUnitSelect(measurement, unit)}
							/>
						))}
					</li>
				))}
			</ul>
		</div>
	)
}
