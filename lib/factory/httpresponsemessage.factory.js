const factory = require('./factory.js');
const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
const { HttpResponseMessage } = require('C:\\component\\lib\\http\\httpresponsemessage.js');
/**
* IsSingleton: false 
* Create HttpResponseMessage 
* @param {messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createHttpResponseMessage({ scopeId, messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort }) {
    const container = factory.createContainer({ scopeId, type: HttpResponseMessage, variableName:'httpResponseMessage', singleton: false });
    container.config({messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort});
    container.config(createMessage({messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}));
    container.initialise();
    return container.references;
}
module.exports = { createHttpResponseMessage };
