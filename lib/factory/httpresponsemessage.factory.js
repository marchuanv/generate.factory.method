const { Factory } = require('../factory.js');
const { HttpResponseMessageFactoryContainer } = require('C:\\component\\lib\\factory\\httpresponsemessage.factory.container.json');
const { HttpResponseMessage } = require('C:\\component\\lib\\http\\httpresponsemessage.prototype.js');
const { createHttpResponseMessage } = require('C:\\component\\lib\\factory\\httpresponsemessage.factory.js');

const factory = new Factory(HttpResponseMessageFactoryContainer);

/**
* IsSingleton: HttpResponseMessageFactoryContainer.singleton
* Create HttpResponseMessage
* @param {scopeId,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createHttpResponseMessage({scopeId,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    const args = {scopeId,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort};
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
