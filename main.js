var request = require('request');
var fs = require('fs');

var accessToken = '727a212db4bf3d306cb27a486344c61384a9a4170d006d569938f92802df4cebf5e96f1376cd6e0f10647';

var exec = function(method, params, callback) {
	params.access_token = accessToken;
	params.v = '5.35';
	request.get({
		uri: 'https://api.vk.com/method/{0}?'.replace('{0}', method),
		qs: params,
		json: true
	}, callback);
};

var idx = 0;
var lastId = 0;

var CURRENT_USER = 4320966;

var start = 1;

var searchRaccoon = function(q, cb) {
	request.get({
		url: 'https://ajax.googleapis.com/ajax/services/search/images',
		qs: {
			v: '1.0', 
			rsz: '1', 
			q: q,
			imgsz: 'meduim',
			start: start
		},
		json: true
	}, function(e, r, b) {
		if (e) {console.error('Error! 4', e);}
		start += 1;
		start %= 2048;
		console.log(e, b);

		if (b.responseData.results.length === 0) {
			console.error('Empty responce', q);
			return;
		}

		var file = start + '.jpg';

		console.log('GET URL', b.responseData.results[0].unescapedUrl);
		var r = request.get(b.responseData.results[0].unescapedUrl).pipe(fs.createWriteStream(file));
		r.on('finish', function() { cb(file); });
	});
};

var uploadPhoto = function(query, cb) {
	exec('photos.getMessagesUploadServer', {}, function(e, r, b) {
		if (e) {console.error('Error! 3', e);}
		searchRaccoon(query, function(rs) {
			console.log('Post url', b.response.upload_url);
			var r = request.post({
				uri: b.response.upload_url,
				formData: {
					photo: fs.createReadStream(rs)
				},	
				json: true
			}, function(e, r, b) {
				console.log('Upload response', b);

				exec('photos.saveMessagesPhoto', b, function(e, r, b) {
					if (e) {console.error('Error! 66', e); return; }

					cb('photo' + CURRENT_USER + '_' + b.response[0].id);
				});
			});
		});
	});
};

var chatWithRaccoon = function(messages) {
	var chatIds = [];

	messages.forEach(function(item) {
		if (item.chat_id && item.body && item.body[0] == '!') {
			chatIds.push({
				chat_id: item.chat_id,
				query: item.body.substring(1)
			});
		}
	});

	return chatIds;
};

var sendRaccoon = function(query, chatId) {
	uploadPhoto(query, function(attachment_id) {
		console.log('Attachment_id', attachment_id);
		exec('messages.send', {chat_id: chatId, attachment: attachment_id}, function(e, r, body) {
			if (e) {console.error('Error! 2', e);}
			console.log('Message sent', body);
		});
	});
};

var handler = function() {
	exec('messages.get', {last_message_id: lastId}, function(error, response, body) {
		if (error) {console.error('Error!', error);}
		var chats = chatWithRaccoon(body.response.items);

		if (body.response.items.length > 0) {
			lastId = body.response.items[0].id;
		}

		chats.forEach(function(chat) {
			sendRaccoon(chat.query, chat.chat_id);
		});

		setTimeout(handler, 1000);
	});
};

exec('messages.get', {count: 1}, function(error, response, body) {
	console.log(error, body);
	lastId = body.response.items[0].id;
	console.log(body.response.items[0]);
	setTimeout(handler, 1000);
});