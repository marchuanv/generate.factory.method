const { FactoryContainer } = require('./factory.container.js');

const { Subscription } = require('C:\\component\\lib\\subscription.js');
function createSubscription({channelName}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({channelName});
    
    const subscription = new Subscription(factoryContainer);
    factoryContainer.add({subscription});
    return factoryContainer;
}
module.exports = { createSubscription };
