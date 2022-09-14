const { Factory } = require('../factory.js');
const factory = new Factory();

const { MessageStoreFactoryContainer } = require('C:\\component\\lib\\factory\\messagestore.container.json');
const { MessageStore } = require('C:\\component\\lib\\messagestore.prototype.js');

/**
* IsSingleton: MessageStoreFactoryContainer.singleton
* Create MessageStore
* @param {scopeId}
*/
function createMessageStore({scopeId}) {
    const args = {scopeId};
    const binding = MessageStoreFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, MessageStoreFactoryContainer);
}
module.exports = { createMessageStore };
