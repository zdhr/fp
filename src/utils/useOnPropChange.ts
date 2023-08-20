import { useState } from 'react'


/**
 * Use to sync react component state after prop changes.
 */
export default function useOnPropChange<T = unknown>(
	propValue: T,
	onChange: (newValue: T) => void,
) {
	const [prevPropValue, setPrevPropValue] = useState(propValue)

	if (propValue !== prevPropValue) {
		setPrevPropValue(propValue)
		onChange(propValue)
	}
}
