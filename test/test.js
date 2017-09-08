
const qs = require('../src');

const parse = qs.parse;
const stringify = qs.stringify;

describe('parse', () => {
	test('a=b', () => {
		expect(parse('a=b')).toEqual({ a: 'b' });
	});

	test('a=b&c=d', () => {
		expect(parse('a=b&c=d')).toEqual({ a: 'b', c: 'd' });
	});

	test('a=b&a=c', () => {
		expect(parse('a=b&a=c')).toEqual({ a: ['b', 'c'] });
	});

	test('a=b&a=c&a=d', () => {
		expect(parse('a=b&a=c&a=d')).toEqual({ a: ['b', 'c', 'd'] });
	});

	test('a=b&e=f&a=c&a=d', () => {
		expect(parse('a=b&e=f&a=c&a=d')).toEqual({ e: 'f', a: ['b', 'c', 'd'] });
	});

	test('a=b&e=f&a=c&a=d+dd', () => {
		expect(parse('a=b&e=f&a=c&a=d+dd')).toEqual({ a: ['b', 'c', 'd dd'], e: 'f' });
	});

	test('a=b&e=f&a=c&a+=d+dd', () => {
		expect(parse('a=b&e=f&a=c&a+=d+dd')).toEqual({ a: ['b', 'c'], 'a ': 'd dd', e: 'f' });
	});

	test('a=b&&e=f&a=c&a+=d+dd', () => {
		expect(parse('a=b&&e=f&a=c&a+=d+dd')).toEqual({ a: ['b', 'c'], 'a ': 'd dd', e: 'f' });
	});

	test('a=b&+&e=f&a=c&a+=d+dd', () => {
		expect(parse('a=b&+&e=f&a=c&a+=d+dd')).toEqual({ a: ['b', 'c'], 'a ': 'd dd', e: 'f' });
	});

	test('a=b&=&e=f&a=c&a+=d+dd', () => {
		expect(parse('a=b&=&e=f&a=c&a+=d+dd')).toEqual({ a: ['b', 'c'], 'a ': 'd dd', e: 'f', '': '' });
	});
});

describe('stringify', () => {
	test("{ a: 'b' }", () => {
		expect(stringify({ a: 'b' })).toBe('a=b');
	});

	test("{ a: 'b', c: 'd' }", () => {
		expect(stringify({ a: 'b', c: 'd' })).toBe('a=b&c=d');
	});

	test("{ a: ['b', 'c'] }", () => {
		expect(stringify({ a: ['b', 'c'] })).toBe('a=b&a=c');
	});

	test("{ a: ['b', 'c', 'd'] }", () => {
		expect(stringify({ a: ['b', 'c', 'd'] })).toBe('a=b&a=c&a=d');
	});

	test("{ a: ['b', 'c', 'd'], e: 'f' }", () => {
		expect(stringify({ a: ['b', 'c', 'd'], e: 'f' })).toBe('a=b&a=c&a=d&e=f');
	});

	test("{ a: ['b', 'c', 'd dd'], e: 'f' }", () => {
		expect(stringify({ a: ['b', 'c', 'd dd'], e: 'f' })).toBe('a=b&a=c&a=d+dd&e=f');
	});

	test("{ a: ['b', 'c'], 'a ': 'd dd', e: 'f' }", () => {
		expect(stringify({ a: ['b', 'c'], 'a ': 'd dd', e: 'f' })).toBe('a=b&a=c&a+=d+dd&e=f');
	});

	test("{ a: ['b', 'c'], 'a ': 'd dd', '': '', e: 'f' }", () => {
		expect(stringify({ a: ['b', 'c'], 'a ': 'd dd', '': '', e: 'f' })).toBe('a=b&a=c&a+=d+dd&=&e=f');
	});
});
