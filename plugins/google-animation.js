var request = require('./../request-wrapper');

module.exports = function(vk) {

	var GOOGLE_API_URL = 'https://ajax.googleapis.com/ajax/services/search/images';
	var VERSION = '1.0';
	var RESULT_SIZE = '1';
	var AS_TYPE = 'gif';

	var imageNumber = 0;
	var MAX_IMAGE_NUMBER = 2048;

	return function(message, query) {
		console.log('[plugin][google-animation] Run plugin', message, query);
		request({
			method: 'GET',
			url: 'https://ajax.googleapis.com/ajax/services/search/images',
			qs: {
				v: VERSION, 
				rsz: RESULT_SIZE, 
				q: query,
				start: imageNumber,
				as_filetype: AS_TYPE,
				imgtype: 'animated'
			},
			json: true
		})
		.then(function(result) {
			if (!result.responseData.results) {
				return console.info('[plugin][google-animation] Empty response for query', query);
			}

			imageNumber = (imageNumber + 1) % MAX_IMAGE_NUMBER;

			var image = result.responseData.results[0].unescapedUrl;
			return vk.docs.getAttachmentId(image)
				.then(function(doc) {
					return vk.messages.send({
						chat_id: message.chat_id,
						user_id: message.chat_id ? undefined : message.user_id,
						attachment: doc
					});
				})
		})
		.catch(function(error) {
			console.error('[plugin][google-animation] Error while getting animation', error)
		});
	};
};