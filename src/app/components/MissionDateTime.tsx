import React, { useState } from 'react'
import { MissionDate } from 'app/types'

import TimeEdit from './TimeEdit'
import EditableTimeDisplay from './EditableTimeDisplay'


interface Props {
	date: MissionDate
	onTimeChange: (time: number) => void
}


/**
 * Display and edit mission start time.
 */
export default function MissionDateTime({
	date,
	onTimeChange,
}: Props) {
	const [isEditing, setIsEditing] = useState(false)


	const onMissionTimeChange = (time: number): void => {
		setIsEditing(false)
		onTimeChange(time)
	}

	return (
		<div className="date-time">
			<div className="date">
				{date.day}. {date.month}. {date.year}
			</div>
			<div className="time">
				{isEditing ? (
					<TimeEdit
						time={date.time}
						onChange={onMissionTimeChange}
						onCancel={() => setIsEditing(false)}
					/>
				) : (
					<EditableTimeDisplay
						time={date.time}
						withHours={true}
						onEditStart={() => setIsEditing(true)}
					/>
				)}
			</div>
		</div>
	)
}
