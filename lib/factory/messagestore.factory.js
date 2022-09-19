const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\messagestore.factory.container.json');
const factory = new Factory(container);

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
        if (binding.primitiveArgs[key]) {
            binding.primitiveArgs[key] = args[key];
        }
    };
    return factory.getInstance({ scopeId });
}
module.exports = { createMessageStore };
