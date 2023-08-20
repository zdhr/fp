/**
 * Create array of items created by provided factory function
 */
export default function createArrayOf<D, T>(
	array: Partial<D>[],
	itemFactory: (itemData: Partial<D>) => T,
): Array<T> {

	return Array.isArray(array) ? array.map(itemFactory) : []
}
