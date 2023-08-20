import React, { useCallback, useState } from 'react'
import { DropzoneProps, useDropzone } from 'react-dropzone'
import JSZip from 'jszip'

import { Mission } from 'app/types'
import { extractMission, parseMission } from 'app/dcsMission'
import { createMission } from 'app/factories'
import demoMission1 from 'app/data/demoMission1'
import demoMission2 from 'app/data/demoMission2'

import Button from 'ui/Button'
import classNames from 'classnames'


interface Props {
	canReset: boolean
	onLoaded: (mission: Mission) => void
}


/**
 * Upload and unload mission file.
 */
export default function MissionControl({
	canReset,
	onLoaded,
}: Props) {
	const [inProgress, setInProgress] = useState(false)

	const onDrop: DropzoneProps['onDrop'] = useCallback((acceptedFiles) => {
		const reader = new FileReader()

		reader.onabort = () => alert('File reading was aborted.')
		reader.onerror = () => alert('File reading has failed.')
		reader.onload = () => {
			const zip = new JSZip()
			zip.loadAsync(reader.result)
				.then(extractMission)
				.then(parseMission)
				.then(onLoaded)
				.catch((error) => {
					alert('File reading has failed.')
					console.error(error)
				})
				.finally(() => {
					setInProgress(false)
				})
		}

		setInProgress(true)
		reader.readAsArrayBuffer(acceptedFiles[0])
	}, [onLoaded])

	const { getRootProps, getInputProps } = useDropzone({ onDrop })

	const onDemoButtonClick = (mission) => {
		onLoaded(createMission(mission))
	}

	const onResetButtonClick = () => {
		if (confirm('This will clear loaded mission, continue?')) {
			onLoaded(null)
		}
	}

	return (
		<div className="mission-control">
			<div
				{...getRootProps()}
				className={classNames('mission-upload', {
					'in-progress': inProgress,
				})}
			>
				<input {...getInputProps({
					multiple: false,
				})} />
				Upload mission
			</div>
			<Button
				label="Demo 1"
				className="demo-mission-button"
				onClick={() => onDemoButtonClick(demoMission1)}
			/>
			<Button
				label="Demo 2"
				className="demo-mission-button"
				onClick={() => onDemoButtonClick(demoMission2)}
			/>
			{canReset && (
				<Button
					label="reset"
					className="reset-mission-button"
					onClick={onResetButtonClick}
				/>
			)}
		</div>
	)
}
