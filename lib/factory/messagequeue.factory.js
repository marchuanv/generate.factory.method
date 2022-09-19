const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\messagequeue.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: MessageQueueFactoryContainer.singleton
* Create MessageQueue
* @param {factoryContainerBindingName}
*/
function createMessageQueue({factoryContainerBindingName}) {
    const args = {factoryContainerBindingName};
    const binding = MessageQueueFactoryContainer.bindings[factoryContainerBindingName];
    if (!binding) {
        throw new Error(`binding ${factoryContainerBindingName} not found.`);
    }
    for(const key of Object.keys(args)) {
        if (binding.primitiveArgs[key]) {
            binding.primitiveArgs[key] = args[key];
        }
    };
    return factory.getInstance({ factoryContainerBindingName });
}
module.exports = { createMessageQueue };
