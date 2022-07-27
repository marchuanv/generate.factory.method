const factory = require('./factory.js');
const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
const { HttpRequestMessage } = require('C:\\component\\lib\\http\\httprequestmessage.js');
/**
* Create HttpRequestMessage
* @param {recipientHost,recipientPort,Id,data,metadata,messageStatusCode,senderHost,senderPort,path}
*/
function createHttpRequestMessage({recipientHost,recipientPort,Id,data,metadata,messageStatusCode,senderHost,senderPort,path}) {
    const container = factory.createContainer({ type: HttpRequestMessage, variableName:'httpRequestMessage', singleton: false });
    container.config({recipientHost,recipientPort,Id,data,metadata,messageStatusCode,senderHost,senderPort,path});
    container.config(createMessage({recipientHost,recipientPort,Id,data,metadata,messageStatusCode,senderHost,senderPort}));
    container.complete();
    return container.references;
}
module.exports = { createHttpRequestMessage };
