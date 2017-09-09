
export function parse(str) {
	return (str + '')
		.replace(/\+/g, ' ')
		.split('&')
		.filter(function (item) {
			return !/^\s*$/.test(item);
		})
		.reduce(function (obj, item, index) {
			var ref = item.split('=');
			var key = ref[0] || '';
			var val = decodeURIComponent(ref[1] || '');
			var prev = obj[key];
			obj[key] = prev === undefined ? val : [].concat(prev, val);
			return obj;
		}, {})
	;
};

export function stringify(obj) {
	return Object.keys(obj || {})
		.reduce(function (arr, key) {
			var val = obj[key];
			if (val instanceof Array) { val = val.join('&' + key + '='); }
			arr.push(key + '=' + val);
			return arr;
		}, [])
		.join('&')
		.replace(/\s/g, '+')
	;
};
