const { FactoryContainer } = require('./factory.container.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpMessageHandler } = require('C:\\component\\lib\\http\\httpmessagehandler.js');
function createHttpMessageHandler({userId,host,port}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({userId,host,port});
    factoryContainer.add(createMessageQueue({userId,host,port}));
    const httpMessageHandler = new HttpMessageHandler(factoryContainer);
    factoryContainer.add({httpMessageHandler});
    return factoryContainer;
}
module.exports = { createHttpMessageHandler };
