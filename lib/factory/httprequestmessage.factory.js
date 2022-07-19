const { FactoryContainer } = require('./factory.container.js');
const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
const { HttpRequestMessage } = require('C:\\component\\lib\\http\\httprequestmessage.js');
function createHttpRequestMessage({method,recipientHost,recipientPort,userId,data,senderHost,senderPort,token,metadata,messageStatusCode,path}) {
    let container = new FactoryContainer();
    container.add({method,recipientHost,recipientPort,userId,data,senderHost,senderPort,token,metadata,messageStatusCode,path});
    container.add(createMessage({recipientHost,recipientPort,userId,data,senderHost,senderPort,token,metadata,messageStatusCode}));
    const httpRequestMessage = new HttpRequestMessage(container);
    container.add({httpRequestMessage});
    return container;
}
module.exports = { createHttpRequestMessage };
