var request = require('./../request-wrapper');

module.exports = function(vk) {

	var GOOGLE_API_URL = 'https://ajax.googleapis.com/ajax/services/search/images';
	var VERSION = '1.0';
	var RESULT_SIZE = '1';
	var IMAGE_SIZE = 'medium';

	var imageNumber = 0;
	var MAX_IMAGE_NUMBER = 2048;

	return function(message, query) {
		console.log('[plugin][google-image] Run plugin', message, query);
		request({
			method: 'GET',
			url: 'https://ajax.googleapis.com/ajax/services/search/images',
			qs: {
				v: VERSION, 
				rsz: RESULT_SIZE, 
				q: query,
				imgsz: IMAGE_SIZE,
				start: imageNumber
			},
			json: true
		})
		.then(function(result) {
			if (!result.responseData.results) {
				return console.info('[plugin][google-image] Empty response for query', query);
			}

			imageNumber = (imageNumber + 1) % MAX_IMAGE_NUMBER;

			var image = result.responseData.results[0].unescapedUrl;
			return vk.messages.getImageAttachmentId(image)
				.then(function(photo) {
					return vk.messages.send({
						chat_id: message.chat_id,
						user_id: message.chat_id ? undefined : message.user_id,
						attachment: photo
					});
				})
		})
		.catch(function(error) {
			console.error('[plugin][google-image] Error while getting image', error)
		});
	};
};