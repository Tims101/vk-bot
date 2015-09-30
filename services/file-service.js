var fs = require('fs');
var Q = require('q');
var request = require('./../request-wrapper');

module.exports = function(options) {
	var fileId = 0;
	var directory = options.directory;

	try {
		fs.mkdirSync(directory);
	} catch(e) {
		console.log('[file-service] Exception while creating directory', e)
	}
	
	var getFilename = function() {
		fileId++;
		return directory + '/' + fileId;
	};

	this.downloadAndSaveFile = function(requestOptions, ext) {
		var deferred = Q.defer();
		var file = getFilename() + '.' + ext;
		console.log('[file-service] Create file', file);
		console.log('[file-service] Request', requestOptions);
		try {
			var downloadImageStream = request
				.raw(requestOptions)
				.pipe(fs.createWriteStream(file));

			downloadImageStream.on('finish', function() {
				deferred.resolve(file);
			});
		} catch (e) {
			deferred.failure(e);
		}

		return deferred.promise;
	};

	this.deleteFile = function(filename) {
		console.log('[file-service] Delete', filename);
		fs.unlink(filename);
	};
};



