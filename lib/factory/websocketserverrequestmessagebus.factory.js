const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\websocketserverrequestmessagebus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: WebSocketServerRequestMessageBusFactoryContainer.singleton
* Create WebSocketServerRequestMessageBus
* @param {factoryContainerBindingName,scopeId}
*/
function createWebSocketServerRequestMessageBus({factoryContainerBindingName,scopeId}) {
    const ctorArgs = {factoryContainerBindingName,scopeId};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createWebSocketServerRequestMessageBus };
