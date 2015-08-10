var request = require('./../request-wrapper');

module.exports = function(vk) {

	var GOOGLE_API_URL = 'https://ajax.googleapis.com/ajax/services/search/images';
	var VERSION = '1.0';
	var RESULT_SIZE = '1';
	var AS_TYPE = 'gif';
	var IMG_TYPE = 'animated'

	var imageNumbers = {};

	return function(message, query) {
		console.log('[plugin][google-animation] Run plugin', message, query);
		imageNumbers[query] = imageNumbers[query] === undefined ? 0 : (imageNumbers[query]  + 1);
		request({
			method: 'GET',
			url: 'https://ajax.googleapis.com/ajax/services/search/images',
			qs: {
				v: VERSION, 
				rsz: RESULT_SIZE, 
				q: query,
				start: imageNumbers[query],
				as_filetype: AS_TYPE,
				imgtype: IMG_TYPE
			},
			json: true
		})
		.then(function(result) {
			if (!result.responseData.results) {
				return console.info('[plugin][google-animation] Empty response for query', query);
			}

			var image = result.responseData.results[0].unescapedUrl;
			return vk.docs.getAttachmentId(image)
				.then(function(doc) {
					return vk.messages.send({
						chat_id: message.chat_id,
						user_id: message.chat_id ? undefined : message.user_id,
						attachment: doc
					});
				});
		})
		.catch(function(error) {
			console.error('[plugin][google-animation] Error while getting animation', error)
		});
	};
};