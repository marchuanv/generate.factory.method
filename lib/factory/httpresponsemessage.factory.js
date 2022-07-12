const { FactoryContainer } = require('./factory.container.js');
const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
const { HttpResponseMessage } = require('C:\\component\\lib\\http\\httpresponsemessage.js');
function createHttpResponseMessage({host,port,userId,data,token,messageStatusCode}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({host,port,userId,data,token,messageStatusCode});
    factoryContainer.add(createMessage({host,port,userId,data,token,messageStatusCode}));
    const httpResponseMessage = new HttpResponseMessage(factoryContainer);
    factoryContainer.add({httpResponseMessage});
    return factoryContainer;
}
module.exports = { createHttpResponseMessage };
