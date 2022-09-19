const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\messagestatus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: MessageStatusFactoryContainer.singleton
* Create MessageStatus
* @param {factoryContainerBindingName,messageStatusCode}
*/
function createMessageStatus({factoryContainerBindingName,messageStatusCode}) {
    const args = {factoryContainerBindingName,messageStatusCode};
    const binding = MessageStatusFactoryContainer.bindings[factoryContainerBindingName];
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
module.exports = { createMessageStatus };
