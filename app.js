var VK = require('./vk');
var MessageService = require('./services/message-service');
var CommandService = require('./services/command-service');

var googleImagePlugin = require('./plugins/google-image');
var googleAnimationPlugin = require('./plugins/google-animation');
var timePlugin = require('./plugins/time');

var vk = new VK({
	accessToken: "78a09e73e4e3855bc64389f420069b3fe5fe0cea1342846690211d0fea8f8370966c00ec8d265531c2191",
	userId: 4320966
});

var commandService = new CommandService();

commandService.registerCommand(/^!(.*)/, googleImagePlugin(vk));
commandService.registerCommand(/^@(.*)/, googleAnimationPlugin(vk));
commandService.registerCommand(/^текущее время/, timePlugin(vk));

MessageService(vk, commandService.executeCommandIfApply.bind(commandService));



