import { OrderedSet } from 'immutable'


/**
 * Create ordered set of items created by provided factory function
 */
export default function createOrderedSetOf<T>(
	array: any[],
	itemFactory: (itemData: any) => T
): OrderedSet<T> {

	return Array.isArray(array) ?
		OrderedSet(array.map(itemFactory)) :
		OrderedSet()
}
