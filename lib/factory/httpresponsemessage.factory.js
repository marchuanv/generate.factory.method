const factory = require('./factory.js');
const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
const { HttpResponseMessage } = require('C:\\component\\lib\\http\\httpresponsemessage.js');
/**
* Create HttpResponseMessage
* @param {recipientHost,recipientPort,Id,userId,data,metadata,messageStatusCode,senderHost,senderPort}
*/
function createHttpResponseMessage({recipientHost,recipientPort,Id,userId,data,metadata,messageStatusCode,senderHost,senderPort}) {
    const container = factory.createContainer({ type: HttpResponseMessage, variableName:'httpResponseMessage', singleton: false });
    container.config({recipientHost,recipientPort,Id,userId,data,metadata,messageStatusCode,senderHost,senderPort});
    container.config(createMessage({recipientHost,recipientPort,Id,userId,data,metadata,messageStatusCode,senderHost,senderPort}));
    container.complete();
    return container.references;
}
module.exports = { createHttpResponseMessage };
