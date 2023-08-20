import { OrderedMap } from 'immutable'


/**
 * Create ordered map of items created by provided factory function
 */
export default function createOrderedMapOf<T>(
	array: any[],
	itemFactory: (itemData: any) => T,
	key: any
): OrderedMap<any, T> {

	return Array.isArray(array) ?
		OrderedMap(array.reduce((map, item) => {
			if (!(key in item)) {
				throw new Error(`Key ${key} is not in item ${JSON.stringify(item)}`)
			}

			return map.set(item[key], itemFactory(item))
		}, OrderedMap())) :
		OrderedMap()
}
