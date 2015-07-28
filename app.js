var VK = require('./vk');
var MessageService = require('./services/message-service');
var CommandService = require('./services/command-service');

var googleImagePlugin = require('./plugins/google-image');
var timePlugin = require('./plugins/time');

var vk = new VK({
	accessToken: '727a212db4bf3d306cb27a486344c61384a9a4170d006d569938f92802df4cebf5e96f1376cd6e0f10647',
	userId: 4320966
});

var commandService = new CommandService();

commandService.registerCommand(/^!(.*)/, googleImagePlugin(vk));
commandService.registerCommand(/^текущее время/, timePlugin(vk));

MessageService(vk, commandService.executeCommandIfApply.bind(commandService));



