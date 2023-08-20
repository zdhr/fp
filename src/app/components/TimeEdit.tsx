import React, { useState } from 'react'
import classNames from 'classnames'
import { parseTimeToSeconds, formatSecondsAsTime, isValidTimeFormat } from 'utils/time'
import TextInput from 'ui/TextInput'
import useOnPropChange from 'utils/useOnPropChange'
import Button from 'ui/Button'


interface Props {
	time: number
	onChange: (time: number) => void
	onCancel: () => void
}


/**
 * Universal component for editing time.
 */
export default function TimeEdit({
	time,
	onChange,
	onCancel,
}: Props) {
	const [inputValue, setInputValue] = useState(() => formatSecondsAsTime(time))
	useOnPropChange(time, (time) => setInputValue(formatSecondsAsTime(time)))

	const onInputKeyUp = (event): void => {
		if (event.key === 'Escape') {
			onCancel()
		}

		if (event.key === 'Enter' ) {
			onSubmit()
		}
	}

	const onSubmit = (): void => {
		if (!isValidTimeFormat(inputValue)) {
			alert('Enter time in hh:mm:ss format. Hours are optional.')

			return
		}

		onChange(parseTimeToSeconds(inputValue))
	}

	const inputClass = classNames({
		'time-input': true,
		'invalid': isValidTimeFormat(inputValue),
	})

	return (
		<div className="time-edit offset-controls">
			<TextInput
				className={inputClass}
				placeholder="hh:mm:ss"
				value={inputValue}
				onChange={setInputValue}
				onKeyUp={onInputKeyUp}
			/>
			<div className="controls">
				<Button label="✔" className="control set" onClick={onSubmit} />
				<Button label="×" className="control cancel" onClick={onCancel} />
			</div>
		</div>
	)
}
