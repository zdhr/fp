import { cleanObject } from '../objects'


const testObject = {
	undef: undefined,
	zero: 0,
	anotherZero: '0',
	falseKey: false,
	nullKey: null,
	trueKey: true,
	stringKey: 'asdf',
	emptyStringKey: '',
}


test('Returns correct object.', () => {
	expect(cleanObject(testObject)).toEqual({
		zero: 0,
		anotherZero: '0',
		trueKey: true,
		stringKey: 'asdf',
	})
})
