const { FactoryContainer } = require('./factory.container.js');
const { createHttpMessageHandler } = require('C:\\component\\lib\\factory\\httpmessagehandler.factory.js');
const { createWebSocketMessageHandler } = require('C:\\component\\lib\\factory\\websocketmessagehandler.factory.js');
const { MessageHandler } = require('C:\\component\\lib\\messagehandler.js');
function createMessageHandler({userId,timeout,hostAddress}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({userId,timeout,hostAddress});
    factoryContainer.add(createWebSocketMessageHandler({timeout,hostAddress}));
factoryContainer.add(createHttpMessageHandler({userId}));
    const messageHandler = new MessageHandler(factoryContainer);
    factoryContainer.add({messageHandler});
    return factoryContainer;
}
module.exports = { createMessageHandler };
