const { Factory } = require('../factory.js');
const { ContentTypeFactoryContainer } = require('C:\\component\\lib\\factory\\contenttype.factory.container.json');
const { ContentType } = require('C:\\component\\lib\\contentType.prototype.js');
const { createContentType } = require('C:\\component\\lib\\factory\\contenttype.factory.js');

const factory = new Factory(ContentTypeFactoryContainer);

/**
* IsSingleton: ContentTypeFactoryContainer.singleton
* Create ContentType
* @param {scopeId,name}
*/
function createContentType({scopeId,name}) {
    const args = {scopeId,name};
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
