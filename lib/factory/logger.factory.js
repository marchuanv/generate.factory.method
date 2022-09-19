const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\logger.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: LoggerFactoryContainer.singleton
* Create Logger
* @param {factoryContainerBindingName}
*/
function createLogger({factoryContainerBindingName}) {
    const args = {factoryContainerBindingName};
    const binding = LoggerFactoryContainer.bindings[factoryContainerBindingName];
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
module.exports = { createLogger };
