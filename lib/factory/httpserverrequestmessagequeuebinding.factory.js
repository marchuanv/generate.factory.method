const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpserverrequestmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpServerRequestMessageQueueBindingFactoryContainer.singleton
* Create HttpServerRequestMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createHttpServerRequestMessageQueueBinding({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {factoryContainerBindingName} });
}
module.exports = { createHttpServerRequestMessageQueueBinding };
