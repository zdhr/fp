import React, { useCallback } from 'react'


interface Props {
	label: React.ReactNode
	title?: string
	className?: string
	onClick: () => void
}


export default function Button({
	label,
	title,
	className,
	onClick,
}: Props) {

	const handleClick = useCallback((event: React.MouseEvent) => {
		const button = event.target as HTMLButtonElement

		button.blur()
		onClick()
	}, [onClick])

	return (
		<button
			type="button"
			className={className}
			title={title}
			children={label}
			onClick={handleClick}
		/>
	)
}
