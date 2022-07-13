const { FactoryContainer } = require('./factory.container.js');
const { createHttpMessageHandler } = require('C:\\component\\lib\\factory\\httpmessagehandler.factory.js');
const { createWebSocketMessageHandler } = require('C:\\component\\lib\\factory\\websocketmessagehandler.factory.js');
const { MessageHandler } = require('C:\\component\\lib\\messagehandler.js');
function createMessageHandler({userId,host,port}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({userId,host,port});
    factoryContainer.add(createWebSocketMessageHandler({}));
factoryContainer.add(createHttpMessageHandler({userId,host,port}));
    const messageHandler = new MessageHandler(factoryContainer);
    factoryContainer.add({messageHandler});
    return factoryContainer;
}
module.exports = { createMessageHandler };
