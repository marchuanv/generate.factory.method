const factory = require('./factory.js');
const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
const { HttpResponseMessage } = require('C:\\component\\lib\\http\\httpresponsemessage.js');
/**
* Create HttpResponseMessage
* @param {recipientHost,recipientPort,Id,userId,data,senderHost,senderPort,token,metadata,messageStatusCode}
*/
function createHttpResponseMessage({recipientHost,recipientPort,Id,userId,data,senderHost,senderPort,token,metadata,messageStatusCode}) {
    const container = factory.createContainer({ type: HttpResponseMessage, variableName:'httpResponseMessage', singleton: false });
    container.config({recipientHost,recipientPort,Id,userId,data,senderHost,senderPort,token,metadata,messageStatusCode});
    container.config(createMessage({recipientHost,recipientPort,Id,userId,data,senderHost,senderPort,token,metadata,messageStatusCode}));
    container.complete();
    return container.references;
}
module.exports = { createHttpResponseMessage };
