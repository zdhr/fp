export function round(number: number, precision: number): number {
	const factor = Math.pow(10, precision)
	const tempNumber = number * factor
	const roundedTempNumber = Math.round(tempNumber)

	return roundedTempNumber / factor
}

export function radiansToDegrees(radians: number): number {
	return radians * (180 / Math.PI)
}
