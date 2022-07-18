const { FactoryContainer } = require('./factory.container.js');
const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
const { HttpRequestMessage } = require('C:\\component\\lib\\http\\httprequestmessage.js');
function createHttpRequestMessage({method,senderHost,senderPort,userId,data,token,metadata,messageStatusCode,path}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({method,senderHost,senderPort,userId,data,token,metadata,messageStatusCode,path});
    factoryContainer.add(createMessage({senderHost,senderPort,userId,data,token,metadata,messageStatusCode}));
    const httpRequestMessage = new HttpRequestMessage(factoryContainer);
    factoryContainer.add({httpRequestMessage});
    return factoryContainer;
}
module.exports = { createHttpRequestMessage };
