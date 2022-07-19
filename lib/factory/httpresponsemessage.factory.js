const { FactoryContainer } = require('./factory.container.js');
const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
const { HttpResponseMessage } = require('C:\\component\\lib\\http\\httpresponsemessage.js');
function createHttpResponseMessage({recipientHost,recipientPort,userId,data,senderHost,senderPort,token,metadata,messageStatusCode}) {
    let container = new FactoryContainer();
    container.add({recipientHost,recipientPort,userId,data,senderHost,senderPort,token,metadata,messageStatusCode});
    container.add(createMessage({recipientHost,recipientPort,userId,data,senderHost,senderPort,token,metadata,messageStatusCode}));
    const httpResponseMessage = new HttpResponseMessage(container);
    container.add({httpResponseMessage});
    return container;
}
module.exports = { createHttpResponseMessage };
