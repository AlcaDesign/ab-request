'use strict';

const request = require('request'),
	
	defaultJSON = defaults({ json: true });

function handleResponse(resolve, reject) {
	return (err, res, body) => {
			if(err) {
				reject({ err, res });
			}
			else {
				resolve({ res, body });
			}
		};
}

function main(options) {
	return new Promise((resolve, reject) => {
		request(options, handleResponse(resolve, reject));
	});
}

function body(options) {
	return main(options)
		.then(res => res.body);
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
		.then(res => res.body);
}

function json(options) {
	return defaultJSON(options);
}

function jsonBody(options) {
	return json(options)
		.then(data => data.body);
}

module.exports = main;
module.exports.body = body;
module.exports.defaults = defaults;
module.exports.defaults.body = defaultsBody;
module.exports.json = json;
module.exports.json.body = jsonBody;
