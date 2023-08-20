import React from 'react'
import { formatSecondsAsTime } from 'utils/time'


interface Props {
	time: number
	withHours?: boolean
	onEditStart: () => void
}


/**
 * Common visuals & format of time, that can be edited.
 */
export default function EditableTimeDisplay({
	time,
	withHours = false,
	onEditStart,
}: Props) {

	return (
		<span
			className="editable"
			title="Edit time"
			onClick={onEditStart}
			children={formatSecondsAsTime(time, withHours)}
		/>
	)
}
