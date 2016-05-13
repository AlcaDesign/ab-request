# AB-Request

A simple Promisified [Request](https://github.com/request/request) library that
works how I like it.

## Install

`npm install AlcaDesign/ab-request`

## Example

```javascript
const request = require('ab-request');

request.json({
		baseUrl: 'https://api.twitch.tv/kraken/',
		url: 'users/alca',
		headers: {
				'Client-ID': '<client id>'
			}
	})
.then(data => {
		if(data.res.statusCode === 200) {
			return data.body;
		}
		throw new Error('User doesn\'t exist');
	})
```

## API

Always return a new Promise. If you catch an error, it always returns an object
containing the error as `err` and the response as `res`.

Using `body` means that it will send automatically return just the body from the
response instead of the response and the body in an object.

### request

A Promisified `request` call.

```javascript
request(options)
.then(data => {
		/*
			data == {
						res: IncomingMessage,
						body
					}
		*/
	})
.catch(e => {
		/*
			e == {
						res: IncomingMessage,
						err
					}
		*/
	});
```

### request.body

The return of `request(options)` and will have the body automatically returned.

```javascript
request(options)
.then(data => {
		/*
			data == body
		*/
	})
.catch(/* ... */);
```

### request.defaults

A Promisified `request.detaults` call.

```javascript

let twitchKraken = request.defaults({
			baseUrl: 'https://api.twitch.tv/kraken/',
			headers: {
					'Client-ID': '<client id>'
				},
			json: true
		})

twitchKraken({
		url: 'users/alca'
	})
.then(data => {
		/*
			data == {
						res: IncomingMessage,
						body
					}
		*/
	})
.catch(/* ... */);
```

### request.defaults.body

The return of `request.defaults(options)` and will have the body automatically
returned.

```javascript

let twitchKraken = request.defaults.body({
			baseUrl: 'https://api.twitch.tv/kraken/',
			headers: {
					'Client-ID': '<client id>'
				},
			json: true
		})

twitchKraken({
		url: 'users/alca'
	})
.then(data => {
		/*
			data == body
		*/
	})
.catch(/* ... */);
```

### request.json

The return of `request.defaults({ json: true })`

```javascript

request.json({
		baseUrl: 'https://api.twitch.tv/kraken/',
		url: 'users/alca',
		headers: {
				'Client-ID': '<client id>'
			}
	})
.then(data => {
		/*
			data == {
						res: IncomingMessage,
						body
					}
		*/
	})
.catch(/* ... */);
```

### request.json.body

The return of `request.defaults({ json: true })` and will have the body
automatically returned.

```javascript

request.json.body({
		baseUrl: 'https://api.twitch.tv/kraken/',
		url: 'users/alca',
		headers: {
				'Client-ID': '<client id>'
			}
	})
.then(data => {
		/*
			data == body
		*/
	})
.catch(/* ... */);
```

---

Copyright 2016 Alca

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
