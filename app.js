var VK = require('./vk');
var MessageService = require('./services/message-service');
var CommandService = require('./services/command-service');

var googleImagePlugin = require('./plugins/google-image');
var googleAnimationPlugin = require('./plugins/google-animation');
var timePlugin = require('./plugins/time');

var vk = new VK({
	accessToken: 'c557b1af63962cae6ce930de4c20eee15a61f9e849dc8fbcc0fc6047e271415402f3e8cf740b141b842ee',
	userId: 316051071
});

var commandService = new CommandService();

commandService.registerCommand(/^!(.*)/, googleImagePlugin(vk));
commandService.registerCommand(/^@(.*)/, googleAnimationPlugin(vk));
commandService.registerCommand(/^текущее время/, timePlugin(vk));

MessageService(vk, commandService.executeCommandIfApply.bind(commandService));



