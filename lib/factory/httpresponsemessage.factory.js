const { FactoryContainer } = require('./factory.container.js');
const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
const { HttpResponseMessage } = require('C:\\component\\lib\\http\\httpresponsemessage.js');
function createHttpResponseMessage({senderHost,senderPort,userId,data,token,metadata,messageStatusCode}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({senderHost,senderPort,userId,data,token,metadata,messageStatusCode});
    factoryContainer.add(createMessage({senderHost,senderPort,userId,data,token,metadata,messageStatusCode}));
    const httpResponseMessage = new HttpResponseMessage(factoryContainer);
    factoryContainer.add({httpResponseMessage});
    return factoryContainer;
}
module.exports = { createHttpResponseMessage };
