/**
 * Remove all attributes with falsy values (except 0) from object.
 */
export function cleanObject<T = AnyObject>(object: T): Partial<T> {

	return Object.entries(object).reduce((cleaned, [key, value]) => {
		if (value || value === 0) {
			cleaned[key] = value
		}

		return cleaned
	}, {})
}
