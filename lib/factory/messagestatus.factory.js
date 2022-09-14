const { Factory } = require('../factory.js');
const { MessageStatusFactoryContainer } = require('C:\\component\\lib\\factory\\messagestatus.factory.container.json');
const { MessageStatus } = require('C:\\component\\lib\\messagestatus.prototype.js');
const { createMessageStatus } = require('C:\\component\\lib\\factory\\messagestatus.factory.js');

const factory = new Factory(MessageStatusFactoryContainer);

/**
* IsSingleton: MessageStatusFactoryContainer.singleton
* Create MessageStatus
* @param {scopeId,messageStatusCode}
*/
function createMessageStatus({scopeId,messageStatusCode}) {
    const args = {scopeId,messageStatusCode};
    const binding = MessageStatusFactoryContainer.bindings[scopeId];
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
module.exports = { createMessageStatus };
