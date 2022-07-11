const { FactoryContainer } = require('./factory.container.js');
const { createMessageHandler } = require('C:\\component\\lib\\factory\\messagehandler.factory.js');
const { MessageBus } = require('C:\\component\\lib\\messagebus.js');
function createMessageBus({userId,timeout,hostAddress}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add(createMessageHandler({userId,timeout,hostAddress}));
    const messageBus = new MessageBus({messageHandler});
    factoryContainer.add(messageBus);
    return factoryContainer;
}
module.exports = { createMessageBus };
