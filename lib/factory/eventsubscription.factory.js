const factory = require('./factory.js');
const { createSharedEventSubscriptions } = require('C:\\component\\lib\\factory\\sharedeventsubscriptions.factory.js');
const { createEvent } = require('C:\\component\\lib\\factory\\event.factory.js');
const { createSubscription } = require('C:\\component\\lib\\factory\\subscription.factory.js');
const { createSharedMessageQueue } = require('C:\\component\\lib\\factory\\sharedmessagequeue.factory.js');
const { EventSubscription } = require('C:\\component\\lib\\eventsubscription.js');
/**
* Create EventSubscription
* @param {eventDescription,eventCode,eventSource,subscriptionName}
*/
function createEventSubscription({eventDescription,eventCode,eventSource,subscriptionName}) {
    const container = factory.createContainer({ type: EventSubscription, variableName:'eventSubscription', singleton: false });
    container.config({eventDescription,eventCode,eventSource,subscriptionName});
    container.config(createSharedMessageQueue({}));
container.config(createSubscription({subscriptionName}));
container.config(createEvent({eventDescription,eventCode,eventSource}));
container.config(createSharedEventSubscriptions({}));
    container.complete();
    return container.references;
}
module.exports = { createEventSubscription };
