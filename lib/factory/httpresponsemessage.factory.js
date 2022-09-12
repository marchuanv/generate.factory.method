const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
const { HttpResponseMessage } = require('C:\\component\\lib\\http\\httpresponsemessage.js');
/**
* IsSingleton: false 
* Create HttpResponseMessage 
* @param {scopeId,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createHttpResponseMessage({scopeId,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    let container = factory.getContainer({ scopeId, type: HttpResponseMessage, variableName:'httpResponseMessage', singleton: false });
    container.config({messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort});
    container.config(createMessage({scopeId,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpResponseMessage };
