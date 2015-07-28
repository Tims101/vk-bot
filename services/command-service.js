module.exports = function() {
	var actions = [];

	this.registerCommand = function(pattern, handler) {
		actions.push({
			pattern: pattern,
			handler: handler
		});
	};

	this.executeCommandIfApply = function(message) {
		console.log('[Command-Service] Execute message', message);

		actions.forEach(function(action) {
			var matches = message.body.match(action.pattern);

			if (matches) {
				console.log('[Command-Service] Matches found', matches);

				var args = [message].concat(matches.slice(1));
				action.handler.apply(null, args);
			}
		});
	};
};