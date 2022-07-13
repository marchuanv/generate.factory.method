const { FactoryContainer } = require('./factory.container.js');
const { createMessageHandler } = require('C:\\component\\lib\\factory\\messagehandler.factory.js');
const { createSubscription } = require('C:\\component\\lib\\factory\\subscription.factory.js');
const { MessageBus } = require('C:\\component\\lib\\messagebus.js');
function createMessageBus({userId,host,port,channelName}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({userId,host,port,channelName});
    factoryContainer.add(createSubscription({channelName}));
factoryContainer.add(createMessageHandler({userId,host,port}));
    const messageBus = new MessageBus(factoryContainer);
    factoryContainer.add({messageBus});
    return factoryContainer;
}
module.exports = { createMessageBus };
