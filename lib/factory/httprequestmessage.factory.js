const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
const { HttpRequestMessageFactoryContainer } = require('C:\\component\\lib\\factory\\httprequestmessage.container.json');
const { HttpRequestMessage } = require('C:\\component\\lib\\http\\httprequestmessage.prototype.js');

/**
* IsSingleton: HttpRequestMessageFactoryContainer.singleton
* Create HttpRequestMessage
* @param {scopeId,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createHttpRequestMessage({scopeId,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    const args = {scopeId,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort};
    const { scopeId } = args;
    const binding = HttpRequestMessageFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, HttpRequestMessageFactoryContainer);
}
module.exports = { createHttpRequestMessage };
