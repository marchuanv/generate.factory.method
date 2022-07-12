const { FactoryContainer } = require('./factory.container.js');
const { createHostAddress } = require('C:\\component\\lib\\factory\\hostaddress.factory.js');
const { createMessageHandler } = require('C:\\component\\lib\\factory\\messagehandler.factory.js');
const { MessageBus } = require('C:\\component\\lib\\messagebus.js');
function createMessageBus({host,port,userId,timeout,subscriptionHandler}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({host,port,userId,timeout,subscriptionHandler});
    factoryContainer.add(createMessageHandler({userId,timeout,host,port}));
factoryContainer.add(createHostAddress({host,port}));
    const messageBus = new MessageBus(factoryContainer);
    factoryContainer.add({messageBus});
    return factoryContainer;
}
module.exports = { createMessageBus };
