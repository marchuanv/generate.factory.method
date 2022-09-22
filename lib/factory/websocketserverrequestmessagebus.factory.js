const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\websocketserverrequestmessagebus.factory.container.json');
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
