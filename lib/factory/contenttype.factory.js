const { Factory } = require('../factory.js');
const factory = new Factory();

const { ContentTypeFactoryContainer } = require('C:\\component\\lib\\factory\\contenttype.container.json');
const { ContentType } = require('C:\\component\\lib\\contentType.prototype.js');

/**
* IsSingleton: ContentTypeFactoryContainer.singleton
* Create ContentType
* @param {scopeId,name}
*/
function createContentType({scopeId,name}) {
    const args = {scopeId,name};
    const { scopeId } = args;
    const binding = ContentTypeFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, ContentTypeFactoryContainer);
}
module.exports = { createContentType };
