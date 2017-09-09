
import { parse, stringify } from '../tiny-querystring';

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

	test('url=http%3A%2F%2Fcap32.com%2Fquery%3Fa%3D2%26b%3D1', () => {
		expect(parse('url=http%3A%2F%2Fcap32.com%2Fquery%3Fa%3D2%26b%3D1')).toEqual({ url: 'http://cap32.com/query?a=2&b=1' });
	});

	test('foo=bar&abc=xyz&abc=123', () => {
		expect(parse('foo=bar&abc=xyz&abc=123')).toEqual({ foo: 'bar', abc: ['xyz', '123'] });
	});
});

describe('stringify', () => {
	test('without argument', () => {
		expect(stringify()).toBe('');
	});

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

	test("{ foo: 'bar', baz: ['qux', 'quux'], corge: '' }", () => {
		expect(stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' })).toBe('foo=bar&baz=qux&baz=quux&corge=');
	});
});
