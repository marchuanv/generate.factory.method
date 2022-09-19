const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httprequestmessage.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpRequestMessageFactoryContainer.singleton
* Create HttpRequestMessage
* @param {messageStatusCode,scopeId,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createHttpRequestMessage({messageStatusCode,scopeId,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    const args = {messageStatusCode,scopeId,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort};
    const binding = HttpRequestMessageFactoryContainer.bindings[scopeId];
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
module.exports = { createHttpRequestMessage };
