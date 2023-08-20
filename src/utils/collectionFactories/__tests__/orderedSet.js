import {OrderedSet} from 'immutable'
import createOrderedSetOf from '../orderedSet'


test('Correct ordered set is created', () => {
	const array = [1,2,3,4]
	const factory = (i) => i * 2
	const orderedSet = createOrderedSetOf(array, factory)

	expect(orderedSet).toBeInstanceOf(OrderedSet)
	expect(orderedSet.toJS()).toEqual([2,4,6,8])
})

test('Empty ordered set created on non array', () => {
	const factory = (i) => i

	const object = createOrderedSetOf({}, factory)
	expect(object).toBeInstanceOf(OrderedSet)
	expect(object.toJS()).toEqual([])

	const nullValue = createOrderedSetOf(null, factory)
	expect(nullValue).toBeInstanceOf(OrderedSet)
	expect(nullValue.toJS()).toEqual([])

	const nullString = createOrderedSetOf('null', factory)
	expect(nullString).toBeInstanceOf(OrderedSet)
	expect(nullString.toJS()).toEqual([])
})
