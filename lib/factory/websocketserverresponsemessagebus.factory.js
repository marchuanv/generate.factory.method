const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\websocketserverresponsemessagebus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: WebSocketServerResponseMessageBusFactoryContainer.singleton
* Create WebSocketServerResponseMessageBus
* @param {factoryContainerBindingName}
*/
function createWebSocketServerResponseMessageBus({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {factoryContainerBindingName} });
}
module.exports = { createWebSocketServerResponseMessageBus };
