const { FactoryContainer } = require('./factory.container.js');
const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
const { HttpResponseMessage } = require('C:\\component\\lib\\http\\httpresponsemessage.js');
function createHttpResponseMessage({userId,data,metadata,messageStatusCode}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add(createMessage({userId,data,metadata,messageStatusCode}));
    const httpResponseMessage = new HttpResponseMessage({message});
    factoryContainer.add(httpResponseMessage);
    return factoryContainer;
}
module.exports = { createHttpResponseMessage };
