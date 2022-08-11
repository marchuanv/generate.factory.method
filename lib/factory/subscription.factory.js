const factory = require('./factory.js');

const { Subscription } = require('C:\\component\\lib\\subscription.js');
/**
* Create Subscription
* @param {subscriptionName}
*/
function createSubscription({subscriptionName}) {
    const container = factory.createContainer({ type: Subscription, variableName:'subscription', singleton: false });
    container.config({subscriptionName});
    
    container.complete();
    return container.references;
}
module.exports = { createSubscription };
