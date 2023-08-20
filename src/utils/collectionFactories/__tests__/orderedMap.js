import {OrderedMap} from 'immutable'
import createOrderedMapOf from '../orderedMap'


test('Correct map is created', () => {
	const array = [{
		id: '1',
		name: 'One',
	}, {
		id: '3',
		name: 'Three',
	}, {
		id: '2',
		name: 'Two',
	}]

	const factory = (i) => i
	const map = createOrderedMapOf(array, factory, 'id')

	expect(map).toBeInstanceOf(OrderedMap)

	// JS objects are always sorted by keys,
	// so we have to find other way to test correct order
	expect(map.keySeq().toJS()).toEqual(['1', '3', '2'])
	expect(map.toJS()).toEqual({
		'1': {
			id: '1',
			name: 'One',
		},
		'2': {
			id: '2',
			name: 'Two',
		},
		'3': {
			id: '3',
			name: 'Three',
		},
	})
})


test('Errors are thrown for wrong arguments', () => {
	const array = [{
		id: '2',
		name: 'Two',
	}]

	const factory = (i) => i

	expect(() => {
		createOrderedMapOf(array, factory, 'idx')
	}).toThrow()

	expect(() => {
		createOrderedMapOf(array, factory)
	}).toThrow()
})


test('Empty map created on non array', () => {
	const factory = (i) => i

	const object = createOrderedMapOf({}, factory, 'id')
	expect(object).toBeInstanceOf(OrderedMap)
	expect(object.toJS()).toEqual({})

	const nullValue = createOrderedMapOf(null, factory, 'id')
	expect(nullValue).toBeInstanceOf(OrderedMap)
	expect(nullValue.toJS()).toEqual({})

	const nullString = createOrderedMapOf('null', factory, 'id')
	expect(nullString).toBeInstanceOf(OrderedMap)
	expect(nullString.toJS()).toEqual({})
})
