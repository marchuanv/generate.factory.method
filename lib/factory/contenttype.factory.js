const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\contenttype.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: ContentTypeFactoryContainer.singleton
* Create ContentType
* @param {name}
*/
function createContentType({name}) {
    const args = {name};
    const binding = ContentTypeFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
        if (binding.primitiveArgs[key]) {
            binding.primitiveArgs[key] = args[key];
        }
    };
    return factory.getInstance({ scopeId });
}
module.exports = { createContentType };
