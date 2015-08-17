var request = require('./../request-wrapper');

module.exports = function(vk, fileService, animated) {

	var GOOGLE_API_URL = 'https://ajax.googleapis.com/ajax/services/search/images';
	var VERSION = '1.0';
	var RESULT_SIZE = '1';

	var imageNumbers = {};

	return function(message, query) {
		console.log('[plugin][google-image] Run plugin', message, query);
		imageNumbers[query] = imageNumbers[query] === undefined ? 0 : (imageNumbers[query]  + 1);
		request({
			method: 'GET',
			url: GOOGLE_API_URL,
			qs: {
				v: VERSION, 
				rsz: RESULT_SIZE, 
				q: query,
				safe: 'active',
				start: imageNumbers[query],
				imgsz: animated ? undefined : 'medium',
				as_filetype: animated ? 'gif' : undefined,
				imgtype: animated ? 'animated' : undefined
			},
			json: true
		})
		.then(function(result) {
			if (!result.responseData.results) {
				return console.info('[plugin][google-image] Empty response for query', query);
			}

			var image = result.responseData.results[0].unescapedUrl;
			var filename;

			fileService
				.downloadAndSaveFile(image, animated ? 'gif' : 'jpg')
				.then(function(file) {
					filename = file;
					return animated ? vk.docs.getAttachmentId(file) : vk.messages.getImageAttachmentId(file);
				})
				.then(function(attachment) {
					return vk.messages.send({
						chat_id: message.chat_id,
						user_id: message.chat_id ? undefined : message.user_id,
						attachment: attachment
					});
				})
				.catch(function(error) {
					console.log('[plugin][google-image] Error while sending image');
				})
				.done(function() {
					fileService.deleteFile(filename);
				});
		})
		.catch(function(error) {
			console.error('[plugin][google-image] Error while getting image', error)
		});
	};
};