const { Factory } = require('C:\\component\\lib\\factory\\factory.js');
const container = require('C:\\component\\lib\\factory\\generated\\websocketserverresponsemessagebus\\websocketserverresponsemessagebus.factory.container.json');
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
