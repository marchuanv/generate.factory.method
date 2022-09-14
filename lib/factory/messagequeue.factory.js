const { Factory } = require('../factory.js');
const { MessageQueueFactoryContainer } = require('C:\\component\\lib\\factory\\messagequeue.factory.container.json');
const factory = new Factory(MessageQueueFactoryContainer);

/**
* IsSingleton: MessageQueueFactoryContainer.singleton
* Create MessageQueue
* @param {scopeId}
*/
function createMessageQueue({scopeId}) {
    const args = {scopeId};
    const binding = MessageQueueFactoryContainer.bindings[scopeId];
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
module.exports = { createMessageQueue };
