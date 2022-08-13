const factory = require('./factory.js');
const { createSubscription } = require('D:\\component\\lib\\factory\\subscription.factory.js');
const { createSharedMessageQueue } = require('D:\\component\\lib\\factory\\sharedmessagequeue.factory.js');
const { createSharedSubscriptions } = require('D:\\component\\lib\\factory\\sharedsubscriptions.factory.js');
const { EventSubscription } = require('D:\\component\\lib\\eventsubscription.js');
/**
* Create EventSubscription
* @param {contextId,eventDescription,eventCode,eventSource,subscriptionName,sharedEventLogger}
*/
function createEventSubscription({contextId,eventDescription,eventCode,eventSource,subscriptionName,sharedEventLogger}) {
    const container = factory.createContainer({ type: EventSubscription, variableName:'eventSubscription', singleton: false });
    container.config({contextId,eventDescription,eventCode,eventSource,subscriptionName,sharedEventLogger});
    container.config(createSharedSubscriptions({}));
container.config(createSharedMessageQueue({}));
container.config(createSubscription({eventDescription,eventCode,eventSource,subscriptionName}));
    container.complete();
    return container.references;
}
module.exports = { createEventSubscription };
