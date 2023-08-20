import { Map } from 'immutable'


/**
 * Create map of items created by provided factory function
 */
export default function createMapOf<K, T, IT extends object>(
	array: IT[],
	itemFactory: (itemData: IT) => T,
	key: string | number
): Map<K, T> {

	return Array.isArray(array) ? Map(array.map((item) => {
		if (!(key in item)) {
			throw new Error(`Key ${key} is not in item ${JSON.stringify(item)}`)
		}

		return [item[key], itemFactory(item)]
	})) : Map()
}
