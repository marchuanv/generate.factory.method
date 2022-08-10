const factory = require('./factory.js');
const { createMessage } = require('D:\\component\\lib\\factory\\message.factory.js');
const { HttpResponseMessage } = require('D:\\component\\lib\\http\\httpresponsemessage.js');
/**
* Create HttpResponseMessage
* @param {messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createHttpResponseMessage({messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    const container = factory.createContainer({ type: HttpResponseMessage, variableName:'httpResponseMessage', singleton: false });
    container.config({messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort});
    container.config(createMessage({messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}));
    container.complete();
    return container.references;
}
module.exports = { createHttpResponseMessage };
