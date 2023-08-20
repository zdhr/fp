import {List} from 'immutable'
import createListOf from '../list'


test('Correct list is created', () => {
	const array = [1, 2, 3, 4]
	const factory = (i) => i * 2
	const list = createListOf(array, factory)

	expect(list).toBeInstanceOf(List)
	expect(list.toJS()).toEqual([2, 4, 6, 8])
})

test('Empty list created on non array', () => {
	const factory = (i) => i

	const object = createListOf({}, factory)
	expect(object).toBeInstanceOf(List)
	expect(object.toJS()).toEqual([])

	const nullValue = createListOf(null, factory)
	expect(nullValue).toBeInstanceOf(List)
	expect(nullValue.toJS()).toEqual([])

	const nullString = createListOf('null', factory)
	expect(nullString).toBeInstanceOf(List)
	expect(nullString.toJS()).toEqual([])
})
