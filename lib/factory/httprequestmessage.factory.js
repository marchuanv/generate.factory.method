const factory = require('./factory.js');
const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
const { HttpRequestMessage } = require('C:\\component\\lib\\http\\httprequestmessage.js');
/**
* IsSingleton: false
* Create HttpRequestMessage
* @param {messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createHttpRequestMessage({messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    const container = factory.createContainer({ type: HttpRequestMessage, variableName:'httpRequestMessage', singleton: false });
    container.config({messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort});
    container.config(createMessage({messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}));
    container.initialise();
    return container.references;
}
module.exports = { createHttpRequestMessage };
