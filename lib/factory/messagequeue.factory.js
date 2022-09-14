const { Factory } = require('../factory.js');
const factory = new Factory();
const { createLogger } = require('C:\\component\\lib\\factory\\logger.factory.js');
const { MessageQueueFactoryContainer } = require('C:\\component\\lib\\factory\\messagequeue.container.json');
const { MessageQueue } = require('C:\\component\\lib\\messagequeue.prototype.js');

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
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, MessageQueueFactoryContainer);
}
module.exports = { createMessageQueue };
