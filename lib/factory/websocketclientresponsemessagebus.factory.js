const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\websocketclientresponsemessagebus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: WebSocketClientResponseMessageBusFactoryContainer.singleton
* Create WebSocketClientResponseMessageBus
* @param {factoryContainerBindingName,scopeId}
*/
function createWebSocketClientResponseMessageBus({factoryContainerBindingName,scopeId}) {
    const ctorArgs = {factoryContainerBindingName,scopeId};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createWebSocketClientResponseMessageBus };
