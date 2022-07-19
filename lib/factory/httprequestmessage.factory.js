const factory = require('./factory.js');
const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
const { HttpRequestMessage } = require('C:\\component\\lib\\http\\httprequestmessage.js');
/**
* Create HttpRequestMessage
* @param {method,recipientHost,recipientPort,userId,data,senderHost,senderPort,token,metadata,messageStatusCode,path}
*/
function createHttpRequestMessage({method,recipientHost,recipientPort,userId,data,senderHost,senderPort,token,metadata,messageStatusCode,path}) {
    const container = factory.createContainer({ type: HttpRequestMessage, variableName:'httpRequestMessage', singleton: false });
    container.config({method,recipientHost,recipientPort,userId,data,senderHost,senderPort,token,metadata,messageStatusCode,path});
    container.config(createMessage({recipientHost,recipientPort,userId,data,senderHost,senderPort,token,metadata,messageStatusCode}));
    container.complete();
    return container.references;
}
module.exports = { createHttpRequestMessage };
