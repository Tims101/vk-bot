module.exports = function(vk, onMessage) {
    var lastMessageId;

    var LISTEN_INTERVAL = 1000;

    var initialize = vk.messages.get({count: 1})
        .then(function(data) {
            console.log(data);
            lastMessageId = data.response.items[0].id;
        })
        .catch(function(error) {
            console.error('[Message-Service] Error while initializing', error);
        });

    var listen = function() {
        vk.messages.get({last_message_id: lastMessageId})
            .then(function(data) {
                var messages = data.response.items;
                lastMessageId = messages.length ? messages[0].id : lastMessageId;

                messages.reverse().forEach(onMessage);
            })
            .catch(function(error) {
                console.error('[Message-Service] Error while listening', error);
            })
            .done(function() {
                setTimeout(listen, LISTEN_INTERVAL);
            });
    };

    initialize.then(listen);
};