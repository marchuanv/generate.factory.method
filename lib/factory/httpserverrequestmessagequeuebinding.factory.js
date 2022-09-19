const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpserverrequestmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpServerRequestMessageQueueBindingFactoryContainer.singleton
* Create HttpServerRequestMessageQueueBinding
* @param {factoryContainerBindingName,scopeId}
*/
function createHttpServerRequestMessageQueueBinding({factoryContainerBindingName,scopeId}) {
    const ctorArgs = {factoryContainerBindingName,scopeId};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createHttpServerRequestMessageQueueBinding };
