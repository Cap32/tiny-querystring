
import qs from 'querystring';
import { parse, stringify } from '../tiny-querystring';

describe('parse', () => {
	test('a=b', () => {
		expect(parse('a=b')).toEqual(qs.parse('a=b'));
	});

	test('a=b&c=d', () => {
		expect(parse('a=b&c=d')).toEqual(qs.parse('a=b&c=d'));
	});

	test('a=b&a=c', () => {
		expect(parse('a=b&a=c')).toEqual(qs.parse('a=b&a=c'));
	});

	test('a=b&a=c&a=d', () => {
		expect(parse('a=b&a=c&a=d')).toEqual(qs.parse('a=b&a=c&a=d'));
	});

	test('a=b&e=f&a=c&a=d', () => {
		expect(parse('a=b&e=f&a=c&a=d')).toEqual(qs.parse('a=b&e=f&a=c&a=d'));
	});

	test('a=b&e=f&a=c&a=d+dd', () => {
		expect(parse('a=b&e=f&a=c&a=d+dd')).toEqual(qs.parse('a=b&e=f&a=c&a=d+dd'));
	});

	test('a=b&e=f&a=c&a+=d+dd', () => {
		expect(parse('a=b&e=f&a=c&a+=d+dd')).toEqual(qs.parse('a=b&e=f&a=c&a+=d+dd'));
	});

	test('a=b&&e=f&a=c&a+=d+dd', () => {
		expect(parse('a=b&&e=f&a=c&a+=d+dd')).toEqual({ a: ['b', 'c'], 'a ': 'd dd', e: 'f' });
	});

	test('a=b& &e=f&a=c&a+=d+dd', () => {
		expect(parse('a=b& &e=f&a=c&a+=d+dd')).toEqual(qs.parse('a=b& &e=f&a=c&a+=d+dd'));
	});

	test('a=b&+&e=f&a=c&a+=d+dd', () => {
		expect(parse('a=b&+&e=f&a=c&a+=d+dd')).toEqual(qs.parse('a=b&+&e=f&a=c&a+=d+dd'));
	});

	test('a=b&=&e=f&a=c&a+=d+dd', () => {
		expect(parse('a=b&=&e=f&a=c&a+=d+dd')).toEqual(qs.parse('a=b&=&e=f&a=c&a+=d+dd'));
	});

	test('a=b&a=c&a%20=d%20dd&e=f', () => {
		expect(parse('a=b&a=c&a%20=d%20dd&e=f')).toEqual(qs.parse('a=b&a=c&a%20=d%20dd&e=f'));
	});

	test('url=http%3A%2F%2Fcap32.com%2Fquery%3Fa%3D2%26b%3D1', () => {
		expect(parse('url=http%3A%2F%2Fcap32.com%2Fquery%3Fa%3D2%26b%3D1')).toEqual(qs.parse('url=http%3A%2F%2Fcap32.com%2Fquery%3Fa%3D2%26b%3D1'));
	});

	test('foo=bar&abc=xyz&abc=123', () => {
		expect(parse('foo=bar&abc=xyz&abc=123')).toEqual(qs.parse('foo=bar&abc=xyz&abc=123'));
	});
});

describe('stringify', () => {
	test('without argument', () => {
		expect(stringify()).toBe(qs.stringify());
	});

	test("{ a: 'b' }", () => {
		expect(stringify({ a: 'b' })).toBe(qs.stringify({ a: 'b' }));
	});

	test("{ a: 'b', c: 'd' }", () => {
		expect(stringify({ a: 'b', c: 'd' })).toBe(qs.stringify({ a: 'b', c: 'd' }));
	});

	test("{ a: ['b', 'c'] }", () => {
		expect(stringify({ a: ['b', 'c'] })).toBe(qs.stringify({ a: ['b', 'c'] }));
	});

	test("{ a: ['b', 'c', 'd'] }", () => {
		expect(stringify({ a: ['b', 'c', 'd'] })).toBe(qs.stringify({ a: ['b', 'c', 'd'] }));
	});

	test("{ a: ['b', 'c', 'd'], e: 'f' }", () => {
		expect(stringify({ a: ['b', 'c', 'd'], e: 'f' })).toBe(qs.stringify({ a: ['b', 'c', 'd'], e: 'f' }));
	});

	test("{ a: ['b', 'c', 'd dd'], e: 'f' }", () => {
		expect(stringify({ a: ['b', 'c', 'd dd'], e: 'f' })).toBe(qs.stringify({ a: ['b', 'c', 'd dd'], e: 'f' }));
	});

	test("{ a: ['b', 'c'], 'a ': 'd dd', e: 'f' }", () => {
		expect(stringify({ a: ['b', 'c'], 'a ': 'd dd', e: 'f' })).toBe(qs.stringify({ a: ['b', 'c'], 'a ': 'd dd', e: 'f' }));
	});

	test("{ a: ['b', 'c'], 'a ': 'd dd', '': '', e: 'f' }", () => {
		expect(stringify({ a: ['b', 'c'], 'a ': 'd dd', '': '', e: 'f' })).toBe(qs.stringify({ a: ['b', 'c'], 'a ': 'd dd', '': '', e: 'f' }));
	});

	test("{ foo: 'bar', baz: ['qux', 'quux'], corge: '' }", () => {
		expect(stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' })).toBe(qs.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' }));
	});
});
