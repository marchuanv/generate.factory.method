const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\websocketclientresponsemessagebus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: WebSocketClientResponseMessageBusFactoryContainer.singleton
* Create WebSocketClientResponseMessageBus
* @param {factoryContainerBindingName}
*/
function createWebSocketClientResponseMessageBus({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {factoryContainerBindingName} });
}
module.exports = { createWebSocketClientResponseMessageBus };
