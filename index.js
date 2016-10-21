/*
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
*/

'use strict';

const request = require('request');

let defaultJSON = defaults({ json: true });

function handleResponse(resolve, reject) {
	return (err, res, body) => {
			if(err) {
				return reject({ err, res });
			}
			resolve({ res, body });
		};
}

function _body(res) {
	return res.body;
}

function main(options) {
	return new Promise((resolve, reject) => {
		request(options, handleResponse(resolve, reject));
	});
}

function body(options) {
	return main(options)
		.then(_body);
}

function defaults(options) {
	let req = request.defaults(options);
	return opts => new Promise((resolve, reject) =>
			req(opts, handleResponse(resolve, reject))
		);
}

function defaultsBody(options) {
	let req = defaults(options);
	return opts => req(opts)
		.then(_body);
}

function jsonBody(options) {
	return defaultJSON
		.then(_body);
}

module.exports = main;
module.exports.body = body;
module.exports.defaults = defaults;
module.exports.defaults.body = defaultsBody;
module.exports.json = defaultJSON;
module.exports.json.body = jsonBody;
