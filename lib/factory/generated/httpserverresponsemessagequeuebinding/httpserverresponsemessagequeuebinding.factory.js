const { Factory } = require('C:\\component\\lib\\factory\\factory.js');
const container = require('C:\\component\\lib\\factory\\generated\\httpserverresponsemessagequeuebinding\\httpserverresponsemessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpServerResponseMessageQueueBindingFactoryContainer.singleton
* Create HttpServerResponseMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createHttpServerResponseMessageQueueBinding({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {factoryContainerBindingName} });
}
module.exports = { createHttpServerResponseMessageQueueBinding };
