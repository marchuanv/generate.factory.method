const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\messagestatus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: MessageStatusFactoryContainer.singleton
* Create MessageStatus
* @param {messageStatusCode}
*/
function createMessageStatus({messageStatusCode}) {
    const args = {messageStatusCode};
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
