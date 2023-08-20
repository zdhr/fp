import {Set} from 'immutable'
import createSetOf from '../set'


test('Correct set is created', () => {
	const array = [1,2,3,4]
	const factory = (i) => i * 2
	const set = createSetOf(array, factory)

	expect(set instanceof Set).toBe(true)
	expect(set.toJS()).toEqual([2,4,6,8])
})

test('Empty set created on non array', () => {
	const factory = (i) => i

	const object = createSetOf({}, factory)
	expect(object instanceof Set).toBe(true)
	expect(object.toJS()).toEqual([])

	const nullValue = createSetOf(null, factory)
	expect(nullValue instanceof Set).toBe(true)
	expect(nullValue.toJS()).toEqual([])

	const nullString = createSetOf('null', factory)
	expect(nullString instanceof Set).toBe(true)
	expect(nullString.toJS()).toEqual([])
})
