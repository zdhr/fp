import { Set } from 'immutable'


/**
 * Create set of items created by provided factory function
 */
export default function createSetOf<T>(
	array: any[],
	itemFactory: (itemData: any) => T
): Set<T> {

	return Array.isArray(array) ? Set(array.map(itemFactory)) : Set()
}
