const factory = require('./factory.js');
const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
const { HttpResponseMessage } = require('C:\\component\\lib\\http\\httpresponsemessage.js');
/**
* Create HttpResponseMessage
* @param {messageStatusCode,Id,data,recipientHost,recipientPort,metadata,userId,senderHost,senderPort}
*/
function createHttpResponseMessage({messageStatusCode,Id,data,recipientHost,recipientPort,metadata,userId,senderHost,senderPort}) {
    const container = factory.createContainer({ type: HttpResponseMessage, variableName:'httpResponseMessage', singleton: false });
    container.config({messageStatusCode,Id,data,recipientHost,recipientPort,metadata,userId,senderHost,senderPort});
    container.config(createMessage({messageStatusCode,Id,data,recipientHost,recipientPort,metadata,userId,senderHost,senderPort}));
    container.complete();
    return container.references;
}
module.exports = { createHttpResponseMessage };
