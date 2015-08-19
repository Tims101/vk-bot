module.exports = function(vk) {
	return function(message) {
		return vk.messages.send({
			chat_id: message.chat_id,
			user_id: message.chat_id ? undefined : message.user_id,
			message: new Date()
		}).catch(function(error) {
			console.error('[plugins][time] Error while sending message', error);
		});
	};
};