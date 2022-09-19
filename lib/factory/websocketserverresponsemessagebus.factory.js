const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\websocketserverresponsemessagebus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: WebSocketServerResponseMessageBusFactoryContainer.singleton
* Create WebSocketServerResponseMessageBus
* @param {factoryContainerBindingName,scopeId}
*/
function createWebSocketServerResponseMessageBus({factoryContainerBindingName,scopeId}) {
    const ctorArgs = {factoryContainerBindingName,scopeId};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createWebSocketServerResponseMessageBus };
