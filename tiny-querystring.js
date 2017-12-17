
export function parse(str) {
	var decode = decodeURIComponent;
	return (str + '')
		.replace(/\+/g, ' ')
		.split('&')
		.filter(Boolean)
		.reduce(function (obj, item, index) {
			var ref = item.split('=');
			var key = decode(ref[0] || '');
			var val = decode(ref[1] || '');
			var prev = obj[key];
			obj[key] = prev === undefined ? val : [].concat(prev, val);
			return obj;
		}, {})
	;
};

export function stringify(obj) {
	var encode = encodeURIComponent;
	return Object.keys(obj || {})
		.reduce(function (arr, key) {
			[].concat(obj[key]).forEach(function (v) {
				arr.push(encode(key) + '=' + encode(v));
			});
			return arr;
		}, [])
		.join('&')
		.replace(/\s/g, '+')
	;
};
