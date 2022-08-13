const factory = require('./factory.js');
const { createSubscription } = require('D:\\component\\lib\\factory\\subscription.factory.js');
const { createSharedMessageQueue } = require('D:\\component\\lib\\factory\\sharedmessagequeue.factory.js');
const { createSharedSubscriptions } = require('D:\\component\\lib\\factory\\sharedsubscriptions.factory.js');
const { createSharedEventLogger } = require('D:\\component\\lib\\factory\\sharedeventlogger.factory.js');
const { EventSubscription } = require('D:\\component\\lib\\eventsubscription.js');
/**
* Create EventSubscription
* @param {contextId,eventDescription,eventCode,eventSource,subscriptionName}
*/
function createEventSubscription({contextId,eventDescription,eventCode,eventSource,subscriptionName}) {
    const container = factory.createContainer({ type: EventSubscription, variableName:'eventSubscription', singleton: false });
    container.config({contextId,eventDescription,eventCode,eventSource,subscriptionName});
    container.config(createSharedEventLogger({}));
container.config(createSharedSubscriptions({}));
container.config(createSharedMessageQueue({}));
container.config(createSubscription({eventDescription,eventCode,eventSource,subscriptionName}));
    container.complete();
    return container.references;
}
module.exports = { createEventSubscription };
