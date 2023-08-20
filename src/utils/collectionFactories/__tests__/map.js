import {Map} from 'immutable'
import createMapOf from '../map'


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
	const map = createMapOf(array, factory, 'id')

	expect(map).toBeInstanceOf(Map)

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
		createMapOf(array, factory, 'idx')
	}).toThrow()

	expect(() => {
		createMapOf(array, factory)
	}).toThrow()
})


test('Empty map created on non array', () => {
	const factory = (i) => i

	const object = createMapOf({}, factory, 'id')
	expect(object).toBeInstanceOf(Map)
	expect(object.toJS()).toEqual({})

	const nullValue = createMapOf(null, factory, 'id')
	expect(nullValue).toBeInstanceOf(Map)
	expect(nullValue.toJS()).toEqual({})

	const nullString = createMapOf('null', factory, 'id')
	expect(nullString).toBeInstanceOf(Map)
	expect(nullString.toJS()).toEqual({})
})
