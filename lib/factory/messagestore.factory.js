const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\messagestore.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: MessageStoreFactoryContainer.singleton
* Create MessageStore
* @param {factoryContainerBindingName}
*/
function createMessageStore({factoryContainerBindingName}) {
    const args = {factoryContainerBindingName};
    const binding = MessageStoreFactoryContainer.bindings[factoryContainerBindingName];
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
module.exports = { createMessageStore };
