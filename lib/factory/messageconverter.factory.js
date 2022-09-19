const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\messageconverter.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: MessageConverterFactoryContainer.singleton
* Create MessageConverter
* @param {factoryContainerBindingName}
*/
function createMessageConverter({factoryContainerBindingName}) {
    const args = {factoryContainerBindingName};
    const binding = MessageConverterFactoryContainer.bindings[factoryContainerBindingName];
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
module.exports = { createMessageConverter };
