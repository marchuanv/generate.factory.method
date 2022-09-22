const { Factory } = require('C:\\component\\lib\\factory\\factory.js');
const container = require('C:\\component\\lib\\factory\\generated\\websocketserverrequestmessagebus\\websocketserverrequestmessagebus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: WebSocketServerRequestMessageBusFactoryContainer.singleton
* Create WebSocketServerRequestMessageBus
* @param {factoryContainerBindingName}
*/
function createWebSocketServerRequestMessageBus({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {factoryContainerBindingName} });
}
module.exports = { createWebSocketServerRequestMessageBus };
