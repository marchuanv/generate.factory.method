const factory = require('./factory.js');
const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
const { HttpRequestMessage } = require('C:\\component\\lib\\http\\httprequestmessage.js');
/**
* Create HttpRequestMessage
* @param {method,recipientHost,recipientPort,Id,data,userId,metadata,messageStatusCode,senderHost,senderPort,path}
*/
function createHttpRequestMessage({method,recipientHost,recipientPort,Id,data,userId,metadata,messageStatusCode,senderHost,senderPort,path}) {
    const container = factory.createContainer({ type: HttpRequestMessage, variableName:'httpRequestMessage', singleton: false });
    container.config({method,recipientHost,recipientPort,Id,data,userId,metadata,messageStatusCode,senderHost,senderPort,path});
    container.config(createMessage({recipientHost,recipientPort,Id,data,userId,metadata,messageStatusCode,senderHost,senderPort}));
    container.complete();
    return container.references;
}
module.exports = { createHttpRequestMessage };
