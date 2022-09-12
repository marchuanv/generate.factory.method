const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
const { HttpResponseMessage } = require('C:\\component\\lib\\http\\httpresponsemessage.prototype.js');
const getHttpResponseMessageFactoryConfig = require('C:\\component\\lib\\factory\\httpresponsemessage.factory.config.js');
/**
* IsSingleton: false 
* Create HttpResponseMessage 
* @param {scopeId,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createHttpResponseMessage({scopeId,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    const container = factory.getContainer({ scopeId, type: HttpResponseMessage, variableName:'httpResponseMessage', singleton: false });
    container.config(getHttpResponseMessageFactoryConfig());
    container.reference({messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort});
        container.reference(createMessage({scopeId,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpResponseMessage };
