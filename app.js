var config = require('./config');

var VK = require('./vk');
var MessageService = require('./services/message-service');
var CommandService = require('./services/command-service');
var CronService = require('./services/cron-service');
var FileService = require('./services/file-service');

var googleImagePlugin = require('./plugins/google-image');
var timePlugin = require('./plugins/time');

var addFriendCron = require('./plugins/cron-add-friends');

var vk = new VK(config.vk);

var commandService = new CommandService();
var cronService = new CronService();
var fileService = new FileService(config.fileService);

commandService.registerCommand(/^!(.*)/, googleImagePlugin(vk, fileService));
commandService.registerCommand(/^@(.*)/, googleImagePlugin(vk, fileService, true));
commandService.registerCommand(/^текущее время/, timePlugin(vk));

cronService.registerCron(60000, addFriendCron(vk));

var onMessage = function(message) {
	commandService.executeCommandIfApply(message);
};

MessageService(vk, onMessage);



