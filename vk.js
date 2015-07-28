var Q = require('q');
var request = require('./request-wrapper');
var extend = require('util')._extend;
var fs = require('fs');
var path = require('path')

module.exports = function(options) {
	this.accessToken = options.accessToken;
	this.userId = options.userId;
	this.version = options.version || '5.35';

	this.executeMethod = function(method, data) {
		var params = extend({}, data);

		extend(params, {
			access_token: this.accessToken,
			v: this.version
		});

		return request({
			method: 'GET',
			uri: 'https://api.vk.com/method/' +  method,
			qs: params,
			json: true
		});
	};

	var fileId = 0;
	var getFile = function() {
		fileId = (fileId + 1) % 256;
		return fileId + '.jpg';
	};

	var saveFile = function(url) {
		var deferred = Q.defer();
		var filename = getFile();
		var downloadImageStream = request.raw.get(url).pipe(fs.createWriteStream(filename));

		downloadImageStream.on('finish', function() {
			deferred.resolve(filename);
		});

		return deferred.promise;
	};

	this.messages = {};

	this.messages.get = function(data) {
		return this.executeMethod('messages.get', data);
	}.bind(this);

	this.messages.send = function(data) {
		return this.executeMethod('messages.send', data);
	}.bind(this);

	this.messages.getImageAttachmentId = function(url) {
		console.log('[vk] Attachment url', url);

		return Q.all([this.photos.getMessagesUploadServer(), saveFile(url)])
			.then(function(res) {
				var result = res[0];
				var file = res[1];

				console.log('[vk] Get message upload server', result.response.upload_url);
				return this.photos.uploadToServer(result.response.upload_url, fs.createReadStream(file));
			}.bind(this))
			.then(this.photos.saveMessagesPhoto.bind(this))
			.then(function(result) {
				console.log('[vk] Get photo id', result.response[0].id)
				return 'photo' + this.userId + '_' + result.response[0].id;
			}.bind(this))
			.catch(function(error) {
				console.error('[vk] Error while getting messages upload server', error);
			})
	}.bind(this);

	this.photos = {};

	this.photos.getMessagesUploadServer = function() {
		console.log('get message upload server');
		return this.executeMethod('photos.getMessagesUploadServer');
	}.bind(this);

	this.photos.uploadToServer = function(url, fileStream) {
		console.log('[vk] Upload filestream to url');

		return request({
			method: 'POST',
			uri: url,
			formData: {
				photo: fileStream
			},	
			json: true
		});
	};

	this.photos.saveMessagesPhoto = function(data) {
		console.log('[vk] Save message photo', data);
		return this.executeMethod('photos.saveMessagesPhoto', data);
	}.bind(this);
};

