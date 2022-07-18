const { FactoryContainer } = require('./factory.container.js');
const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
const { HttpResponseMessage } = require('C:\\component\\lib\\http\\httpresponsemessage.js');
function createHttpResponseMessage({recipientHost,recipientPort,userId,data,senderHost,senderPort,token,metadata,messageStatusCode}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({recipientHost,recipientPort,userId,data,senderHost,senderPort,token,metadata,messageStatusCode});
    factoryContainer.add(createMessage({recipientHost,recipientPort,userId,data,senderHost,senderPort,token,metadata,messageStatusCode}));
    const httpResponseMessage = new HttpResponseMessage(factoryContainer);
    factoryContainer.add({httpResponseMessage});
    return factoryContainer;
}
module.exports = { createHttpResponseMessage };
