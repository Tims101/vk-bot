var Q = require('q');
var request = require('request');

module.exports = function(options) {
	var deferred = Q.defer();

	request(options, function(error, response, body) {
		if (error) {
			deferred.reject(error);
		} else {
			deferred.resolve(body);
		}
	});

	return deferred.promise;
};

module.exports.raw = request;