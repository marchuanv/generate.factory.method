const factory = require('../factory.js');
const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
const { HttpRequestMessage } = require('C:\\component\\lib\\http\\httprequestmessage.js');
/**
* IsSingleton: false 
* Create HttpRequestMessage 
* @param {scopeId,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createHttpRequestMessage({scopeId,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    let container = factory.getContainer({ scopeId, type: HttpRequestMessage, variableName:'httpRequestMessage', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: HttpRequestMessage, variableName:'httpRequestMessage', singleton: false });
        container.config({scopeId,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort});
            container.config(createMessage({scopeId,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpRequestMessage };
