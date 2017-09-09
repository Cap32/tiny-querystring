# tiny-querystring

Tiny parsing and formatting URL query strings for Node.js and browser. (Only 430B only after gziped)


## Installation

##### NPM

```bash
npm install tiny-querystring
```

##### Yarn

```bash
yarn add tiny-querystring
```

##### 1998 Script Tag

```html
<script src="https://unpkg.com/tiny-querystring/dist/tiny-querystring.umd.js"></script>
```

## Usage

### parse(str)

Parses a URL query string (str) into a collection of key and value pairs.

###### Example

```js
import { parse } from 'tiny-querystring';
parse('foo=bar&abc=xyz&abc=123');
/* returns { foo: 'bar', abc: ['xyz', '123'] } */
```

### stringify(obj)

Produces a URL query string from a given obj by iterating through the object's "own properties".

###### Example

```js
import { stringify } from 'tiny-querystring';
stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' });

/* returns 'foo=bar&baz=qux&baz=quux&corge=' */
```


## License

MIT
