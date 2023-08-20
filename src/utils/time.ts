import {sprintf} from 'sprintf-js'


/**
 * Format second to human readable time format.
 * Second parameter determines whether to show zero hours
 * 1200 -> 20:00 or 00:20:00
 * 3600 -> 01:00:00
 */
export function formatSecondsAsTime(seconds: number, keepHours = true): string {
	const hours = Math.floor(seconds / 3600)
	const secondsWithoutHours = seconds - hours * 3600

	const minutes = Math.floor(secondsWithoutHours / 60)
	const remainingSeconds = secondsWithoutHours - minutes * 60

	return hours || keepHours ?
		sprintf('%02d:%02d:%02d', hours, minutes, remainingSeconds) :
 		sprintf('%02d:%02d', minutes, remainingSeconds)
}

/**
 * Parse time to in hh:mm:ss format to seconds. Hours are optional
 */
export function parseTimeToSeconds(time: string): number {
	const parts = time.split(':').map(
		(decimal) => parseInt(decimal, 10)
	)

	return parts.length === 3 ?
		parts[0] * 3600 + parts[1] * 60 + parts[2] :
		parts[0] * 60 + parts[1]
}

/**
 * Check if value is hh:mm:ss time format. Hours and leading zeroes are optional
 */
export function isValidTimeFormat(time: string): boolean {
	return /^([0-9]{1,2}:)?[0-9]{1,2}:[0-9]{1,2}$/.test(time)
}
