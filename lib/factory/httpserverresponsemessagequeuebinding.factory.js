const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpserverresponsemessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpServerResponseMessageQueueBindingFactoryContainer.singleton
* Create HttpServerResponseMessageQueueBinding
* @param {factoryContainerBindingName,scopeId}
*/
function createHttpServerResponseMessageQueueBinding({factoryContainerBindingName,scopeId}) {
    const ctorArgs = {factoryContainerBindingName,scopeId};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createHttpServerResponseMessageQueueBinding };
