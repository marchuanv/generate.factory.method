const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\message.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: MessageFactoryContainer.singleton
* Create Message
* @param {messageStatusCode,scopeId,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createMessage({messageStatusCode,scopeId,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    const args = {messageStatusCode,scopeId,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort};
    const binding = MessageFactoryContainer.bindings[scopeId];
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
module.exports = { createMessage };
