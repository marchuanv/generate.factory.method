const { Factory } = require('../factory.js');
const factory = new Factory();

const { MessageStatusFactoryContainer } = require('C:\\component\\lib\\factory\\messagestatus.container.json');
const { MessageStatus } = require('C:\\component\\lib\\messagestatus.prototype.js');

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
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, MessageStatusFactoryContainer);
}
module.exports = { createMessageStatus };
