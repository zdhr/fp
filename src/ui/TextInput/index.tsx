import React, { useRef, useImperativeHandle, forwardRef } from 'react'


export interface Props {
	value: string
	name?: string
	className?: string
	placeholder?: string
	autoFocus?: boolean
	autoComplete?: string
	disabled?: boolean
	maxLength?: number
	testId?: string

	onChange: (value: string) => void,
	onBlur?: (event: React.FocusEvent) => void
	onFocus?: (event: React.FocusEvent) => void
	onKeyUp?: (event: React.KeyboardEvent) => void
	onKeyDown?: (event: React.KeyboardEvent) => void
}


export default forwardRef(function TextInput({
	value,
	name,
	className,
	placeholder,
	autoFocus,
	autoComplete,
	disabled,
	maxLength,
	testId,

	onChange,
	onBlur,
	onFocus,
	onKeyUp,
	onKeyDown,
}: Props, ref: React.Ref<HTMLInputElement>) {
	const inputRef = useRef<HTMLInputElement>()

	useImperativeHandle(ref, () => inputRef.current)

	return (
		<input
			ref={inputRef}
			type="text"
			name={name}
			className={className}
			value={value}
			autoFocus={autoFocus}
			autoComplete={autoComplete}
			placeholder={placeholder}
			disabled={disabled}
			maxLength={maxLength}
			data-testid={testId}
			onChange={(event) => onChange(event.target.value)}
			onBlur={onBlur}
			onFocus={onFocus}
			onKeyUp={onKeyUp}
			onKeyDown={onKeyDown}
		/>
	)
})
