const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\websocketclientrequestmessagebus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: WebSocketClientRequestMessageBusFactoryContainer.singleton
* Create WebSocketClientRequestMessageBus
* @param {factoryContainerBindingName,scopeId}
*/
function createWebSocketClientRequestMessageBus({factoryContainerBindingName,scopeId}) {
    const ctorArgs = {factoryContainerBindingName,scopeId};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createWebSocketClientRequestMessageBus };
