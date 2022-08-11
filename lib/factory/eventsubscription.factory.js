const factory = require('./factory.js');
const { createEvent } = require('C:\\component\\lib\\factory\\event.factory.js');
const { createSharedMessageQueue } = require('C:\\component\\lib\\factory\\sharedmessagequeue.factory.js');
const { EventSubscription } = require('C:\\component\\lib\\eventsubscription.js');
/**
* Create EventSubscription
* @param {eventDescription,eventCode,eventSource}
*/
function createEventSubscription({eventDescription,eventCode,eventSource}) {
    const container = factory.createContainer({ type: EventSubscription, variableName:'eventSubscription', singleton: false });
    container.config({eventDescription,eventCode,eventSource});
    container.config(createSharedMessageQueue({}));
container.config(createEvent({eventDescription,eventCode,eventSource}));
    container.complete();
    return container.references;
}
module.exports = { createEventSubscription };
