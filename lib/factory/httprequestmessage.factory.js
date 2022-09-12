const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
const { HttpRequestMessage } = require('C:\\component\\lib\\http\\httprequestmessage.prototype.js');
const getHttpRequestMessageFactoryConfig = require('C:\\component\\lib\\factory\\httprequestmessage.factory.config.js');
/**
* IsSingleton: false 
* Create HttpRequestMessage 
* @param {scopeId,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createHttpRequestMessage({scopeId,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    const container = factory.getContainer({ scopeId, type: HttpRequestMessage, variableName:'httpRequestMessage', singleton: false });
    container.config(getHttpRequestMessageFactoryConfig());
    container.reference({messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort});
        container.reference(createMessage({scopeId,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpRequestMessage };
