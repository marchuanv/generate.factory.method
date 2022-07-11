const { FactoryContainer } = require('./factory.container.js');

const { Subscription } = require('C:\\component\\lib\\subscription.js');
function createSubscription({channelName}) {
    let factoryContainer = new FactoryContainer();
    
    const subscription = new Subscription({channelName});
    factoryContainer.add(subscription);
    return factoryContainer;
}
module.exports = { createSubscription };
