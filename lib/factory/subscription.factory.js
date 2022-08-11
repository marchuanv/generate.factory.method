const factory = require('./factory.js');
const { createEvent } = require('C:\\component\\lib\\factory\\event.factory.js');
const { Subscription } = require('C:\\component\\lib\\subscription.js');
/**
* Create Subscription
* @param {eventDescription,eventCode,eventSource,subscriptionName}
*/
function createSubscription({eventDescription,eventCode,eventSource,subscriptionName}) {
    const container = factory.createContainer({ type: Subscription, variableName:'subscription', singleton: false });
    container.config({eventDescription,eventCode,eventSource,subscriptionName});
    container.config(createEvent({eventDescription,eventCode,eventSource}));
    container.complete();
    return container.references;
}
module.exports = { createSubscription };
