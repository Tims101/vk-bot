var request = require('./../request-wrapper');

module.exports = function(vk) {

	var GOOGLE_API_URL = 'https://ajax.googleapis.com/ajax/services/search/images';
	var VERSION = '1.0';
	var RESULT_SIZE = '1';
	var IMAGE_SIZE = 'medium';

	var imageNumbers = {};

	return function(message, query) {
		console.log('[plugin][google-image] Run plugin', message, query);
		imageNumbers[query] = imageNumbers[query] === undefined ? 0 : (imageNumbers[query]  + 1);
		console.log('Image number', imageNumbers[query]);
		request({
			method: 'GET',
			url: 'https://ajax.googleapis.com/ajax/services/search/images',
			qs: {
				v: VERSION, 
				rsz: RESULT_SIZE, 
				q: query,
				imgsz: IMAGE_SIZE,
				start: imageNumbers[query]
			},
			json: true
		})
		.then(function(result) {
			if (!result.responseData.results) {
				return console.info('[plugin][google-image] Empty response for query', query);
			}

			var image = result.responseData.results[0].unescapedUrl;
			return vk.messages.getImageAttachmentId(image)
				.then(function(photo) {
					return vk.messages.send({
						chat_id: message.chat_id,
						user_id: message.chat_id ? undefined : message.user_id,
						attachment: photo
					});
				});
		})
		.catch(function(error) {
			console.error('[plugin][google-image] Error while getting image', error)
		});
	};
};