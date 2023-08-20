import { List } from 'immutable'


/**
 * Create list of items created by provided factory function
 */
export default function createListOf<D, T>(
	array: Partial<D>[],
	itemFactory: (itemData: Partial<D>) => T
): List<T> {

	return Array.isArray(array) ? List(array.map(itemFactory)) : List()
}
