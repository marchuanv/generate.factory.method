const { FactoryContainer } = require('./factory.container.js');

const { SubscriptionHandler } = require('C:\\component\\lib\\subscriptionhandler.js');
function createSubscriptionHandler({channelName}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({channelName});
    
    const subscriptionHandler = new SubscriptionHandler(factoryContainer);
    factoryContainer.add({subscriptionHandler});
    return factoryContainer;
}
module.exports = { createSubscriptionHandler };
