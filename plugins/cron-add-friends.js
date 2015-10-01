module.exports = function(vk) {
    return function() {
        console.log('[Cron-Add-Friends] Execute');
        vk.users
            .getFollowers()
            .then(function(data) {
                var items = data.response.items;

                console.log('[Cron-Add-Friends] Followers', items);

                items.forEach(function(userId) {
                    console.log('[Cron-Add-Friends] Add friend', userId);
                    vk.friends.add(userId);
                });
            });
    };
};