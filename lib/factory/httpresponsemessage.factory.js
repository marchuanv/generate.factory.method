const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpresponsemessage.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpResponseMessageFactoryContainer.singleton
* Create HttpResponseMessage
* @param {messageStatusCode,scopeId,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createHttpResponseMessage({messageStatusCode,scopeId,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    const args = {messageStatusCode,scopeId,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort};
    const binding = HttpResponseMessageFactoryContainer.bindings[scopeId];
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
module.exports = { createHttpResponseMessage };
