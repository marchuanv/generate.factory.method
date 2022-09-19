const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\contenttype.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: ContentTypeFactoryContainer.singleton
* Create ContentType
* @param {factoryContainerBindingName,name}
*/
function createContentType({factoryContainerBindingName,name}) {
    const args = {factoryContainerBindingName,name};
    const binding = ContentTypeFactoryContainer.bindings[factoryContainerBindingName];
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
module.exports = { createContentType };
