const { FactoryContainer } = require('./factory.container.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpMessageHandler } = require('C:\\component\\lib\\http\\httpmessagehandler.js');
function createHttpMessageHandler({userId}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add(createMessageQueue({userId}));
    const httpMessageHandler = new HttpMessageHandler({messageQueue});
    factoryContainer.add(httpMessageHandler);
    return factoryContainer;
}
module.exports = { createHttpMessageHandler };
